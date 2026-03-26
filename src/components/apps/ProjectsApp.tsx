'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ChevronDown,
    ChevronRight,
    ExternalLink,
    FolderOpen,
    Github,
    Grid2x2,
    HardDrive,
    Home,
    LayoutGrid,
    Library,
    List,
    Monitor,
    MoreHorizontal,
    RefreshCw,
    Search,
    Star,
    TableProperties,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../../data/projects'
import { Project } from '../../types/project'
import { useWindowStore } from '../../store/windowStore'
import { Win11FolderIcon } from './Win11FolderIcon'
import { cn } from '../../lib/cn'
import { useOneUiStore } from '../../store/oneUiStore'
import { OneUiBadge, OneUiCard, OneUiMetric, OneUiSection } from '../oneui/OneUiPrimitives'

interface ProjectsAppProps {
    isMobile?: boolean
}

type ExplorerView = 'details' | 'list' | 'tiles'
type SortKey = 'title' | 'status' | 'year' | 'projectType'

const DETAIL_COLUMN_SPECS = {
    name: { minWidth: 220, flex: '1.9 1 220px' },
    status: { minWidth: 92, flex: '0.72 1 92px' },
    type: { minWidth: 104, flex: '0.82 1 104px' },
    tech: { minWidth: 180, flex: '1.3 1 180px' },
    year: { minWidth: 68, flex: '0.45 1 68px' },
} as const

const SIDEBAR_SECTIONS: {
    title: string
    items: {
        id: string
        label: string
        icon: typeof Home
        href?: string
    }[]
}[] = [
    {
        title: 'Home',
        items: [
            { id: 'home', label: 'Home', icon: Home },
            { id: 'gallery', label: 'Gallery', icon: Library },
            { id: 'desktop', label: 'Desktop', icon: Monitor },
        ],
    },
    {
        title: 'This PC',
        items: [
            { id: 'projects', label: 'Projects', icon: FolderOpen },
            { id: 'portfolio-drive', label: 'Portfolio Drive (C:)', icon: HardDrive },
        ],
    },
    {
        title: 'Network',
        items: [
            { id: 'github', label: 'GitHub', icon: Github, href: 'https://github.com/shreyansh-os' },
            { id: 'featured', label: 'Featured Live Work', icon: Star, href: 'https://godialysis.in/' },
        ],
    },
]

export default function ProjectsApp({ isMobile }: ProjectsAppProps) {
    const openWindow = useWindowStore((s) => s.openWindow)
    const detailsPaneRef = useRef<HTMLDivElement>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(projects[0]?.id ?? null)
    const [view, setView] = useState<ExplorerView>('details')
    const [sortKey, setSortKey] = useState<SortKey>('title')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [sidebarActive, setSidebarActive] = useState('projects')
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; projectId: string } | null>(null)
    const [detailsPaneWidth, setDetailsPaneWidth] = useState(0)

    useEffect(() => {
        const node = detailsPaneRef.current
        if (!node) return

        const observer = new ResizeObserver((entries) => {
            const nextWidth = entries[0]?.contentRect.width ?? 0
            setDetailsPaneWidth(nextWidth)
        })

        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    const sortedProjects = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase()
        const filtered = projects.filter((project) => {
            if (!normalizedQuery) return true
            return (
                project.title.toLowerCase().includes(normalizedQuery) ||
                project.description.toLowerCase().includes(normalizedQuery) ||
                project.projectType.toLowerCase().includes(normalizedQuery) ||
                project.tech.some((item) => item.toLowerCase().includes(normalizedQuery))
            )
        })

        return filtered.sort((a, b) => {
            const left = String(a[sortKey]).toLowerCase()
            const right = String(b[sortKey]).toLowerCase()

            if (left < right) return sortDirection === 'asc' ? -1 : 1
            if (left > right) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
    }, [searchQuery, sortDirection, sortKey])

    const selectedProject =
        sortedProjects.find((project) => project.id === selectedId) ??
        projects.find((project) => project.id === selectedId) ??
        sortedProjects[0] ??
        null

    const visibleDetailColumns = useMemo(() => {
        const width = detailsPaneWidth
        return {
            showStatus: width >= 320,
            showType: width >= 420,
            showTech: width >= 600,
            showYear: width >= 670,
        }
    }, [detailsPaneWidth])

    if (isMobile) {
        return <ProjectsMobileApp />
    }

    const handleOpenProject = (project: Project) => {
        openWindow('project-detail', { project, title: project.title })
    }

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
            return
        }

        setSortKey(key)
        setSortDirection('asc')
    }

    const renderContent = () => {
        if (view === 'tiles') {
            return (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 p-4">
                    {sortedProjects.map((project) => (
                        <ExplorerTile
                            key={project.id}
                            project={project}
                            selected={project.id === selectedId}
                            onClick={() => setSelectedId(project.id)}
                            onDoubleClick={() => handleOpenProject(project)}
                            onContextMenu={(event) => {
                                event.preventDefault()
                                setSelectedId(project.id)
                                setContextMenu({ x: event.clientX, y: event.clientY, projectId: project.id })
                            }}
                        />
                    ))}
                </div>
            )
        }

        if (view === 'list') {
            return (
                <div className="py-1">
                    {sortedProjects.map((project) => (
                        <ExplorerListRow
                            key={project.id}
                            project={project}
                            selected={project.id === selectedId}
                            onClick={() => setSelectedId(project.id)}
                            onDoubleClick={() => handleOpenProject(project)}
                            onContextMenu={(event) => {
                                event.preventDefault()
                                setSelectedId(project.id)
                                setContextMenu({ x: event.clientX, y: event.clientY, projectId: project.id })
                            }}
                        />
                    ))}
                </div>
            )
        }

        return (
            <div className="flex flex-col">
                <div className="sticky top-0 z-10 flex h-9 items-center border-b border-[var(--surface-glass-border)] bg-[var(--surface-elevated)]/95 text-[11px] text-[var(--text-secondary)] backdrop-blur-xl">
                    <HeaderButton label="Name" column="name" active={sortKey === 'title'} direction={sortDirection} onClick={() => handleSort('title')} />
                    {visibleDetailColumns.showStatus ? <HeaderButton label="Status" column="status" active={sortKey === 'status'} direction={sortDirection} onClick={() => handleSort('status')} /> : null}
                    {visibleDetailColumns.showType ? <HeaderButton label="Type" column="type" active={sortKey === 'projectType'} direction={sortDirection} onClick={() => handleSort('projectType')} /> : null}
                    {visibleDetailColumns.showTech ? <div className="px-3" style={getColumnStyle('tech')}>Tech stack</div> : null}
                    {visibleDetailColumns.showYear ? <HeaderButton label="Year" column="year" active={sortKey === 'year'} direction={sortDirection} onClick={() => handleSort('year')} /> : null}
                </div>

                {sortedProjects.map((project) => (
                    <ExplorerDetailsRow
                        key={project.id}
                        project={project}
                        visibleColumns={visibleDetailColumns}
                        selected={project.id === selectedId}
                        onClick={() => setSelectedId(project.id)}
                        onDoubleClick={() => handleOpenProject(project)}
                        onContextMenu={(event) => {
                            event.preventDefault()
                            setSelectedId(project.id)
                            setContextMenu({ x: event.clientX, y: event.clientY, projectId: project.id })
                        }}
                    />
                ))}
            </div>
        )
    }

    return (
        <div
            className="flex h-full flex-col overflow-hidden text-[var(--text-primary)]"
            style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface-elevated) 90%, #20283a 10%) 0%, color-mix(in srgb, var(--surface-base) 86%, #192131 14%) 100%)' }}
        >
            <div className="flex h-11 items-center gap-1 border-b border-[var(--surface-glass-border)] bg-[var(--win11-titlebar)] px-3">
                <ToolbarIcon icon={ArrowLeft} disabled />
                <ToolbarIcon icon={ArrowRight} disabled />
                <ToolbarIcon icon={ArrowUp} />
                <ToolbarIcon icon={RefreshCw} />
                <div className="mx-2 flex h-8 flex-1 items-center rounded-md border border-[var(--surface-glass-border)] bg-[var(--surface-elevated)] px-3 text-xs">
                    <FolderOpen size={14} className="mr-2 text-[var(--accent-primary)]" />
                    <span className="text-[var(--text-secondary)]">This PC</span>
                    <ChevronRight size={12} className="mx-1 text-[var(--text-tertiary)]" />
                    <span className="text-[var(--text-secondary)]">Portfolio</span>
                    <ChevronRight size={12} className="mx-1 text-[var(--text-tertiary)]" />
                    <span className="font-medium text-[var(--text-primary)]">Projects</span>
                </div>
                <div className="flex h-8 w-[220px] items-center rounded-md border border-[var(--surface-glass-border)] bg-[var(--surface-elevated)] px-3 text-xs">
                    <Search size={14} className="mr-2 text-[var(--text-tertiary)]" />
                    <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search Projects" className="w-full bg-transparent outline-none placeholder:text-[var(--text-tertiary)]" />
                </div>
            </div>

            <div
                className="flex h-11 items-center gap-2 border-b border-[var(--surface-glass-border)] px-4 text-xs"
                style={{ background: 'color-mix(in srgb, var(--surface-base) 78%, #21293b 22%)' }}
            >
                <CommandButton label="New" icon={FolderOpen} />
                <CommandButton label="Sort" icon={ChevronDown} onClick={() => handleSort(sortKey)} />
                <CommandButton label="View" icon={view === 'details' ? TableProperties : view === 'list' ? List : LayoutGrid} onClick={() => setView((current) => (current === 'details' ? 'list' : current === 'list' ? 'tiles' : 'details'))} />
                <CommandButton label="More" icon={MoreHorizontal} />
            </div>

            <div className="flex min-h-0 flex-1">
                <aside
                    className="hidden w-[240px] flex-col border-r border-[var(--surface-glass-border)] p-2 backdrop-blur-xl md:flex"
                    style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface-elevated) 84%, #263049 16%) 0%, color-mix(in srgb, var(--surface-elevated) 76%, var(--surface-base) 24%) 100%)' }}
                >
                    {SIDEBAR_SECTIONS.map((section) => (
                        <div key={section.title} className="mb-4">
                            <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">{section.title}</div>
                            <div className="space-y-0.5">
                                {section.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setSidebarActive(item.id)
                                            if (item.href) {
                                                window.open(item.href, '_blank', 'noopener,noreferrer')
                                            }
                                        }}
                                        className={cn(
                                            'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[12.5px] transition-colors',
                                            sidebarActive === item.id ? 'bg-[var(--accent-primary-dim)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--glass-hover)] hover:text-[var(--text-primary)]'
                                        )}
                                    >
                                        <item.icon size={16} />
                                        <span className="truncate">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </aside>

                <main
                    ref={detailsPaneRef}
                    className="flex min-w-0 flex-1 flex-col"
                    style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface-base) 80%, #20283a 20%) 0%, color-mix(in srgb, var(--surface-base) 94%, var(--surface-elevated) 6%) 100%)' }}
                    onClick={() => setContextMenu(null)}
                >
                    <div className="flex h-9 items-center justify-between border-b border-[var(--surface-glass-border)] px-4 text-[11px] text-[var(--text-secondary)]">
                        <span>{sortedProjects.length} items</span>
                        <span>Folder tools active</span>
                    </div>
                    <div className="min-h-0 flex-1 overflow-auto">{renderContent()}</div>
                </main>

                <aside
                    className="hidden w-[280px] flex-col border-l border-[var(--surface-glass-border)] p-4 backdrop-blur-xl lg:flex"
                    style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface-elevated) 86%, #243048 14%) 0%, color-mix(in srgb, var(--surface-elevated) 78%, var(--surface-base) 22%) 100%)' }}
                >
                    {selectedProject ? (
                        <>
                            <div className="mb-4 flex items-center gap-3">
                                <div className="h-14 w-14 flex-shrink-0">
                                    <Win11FolderIcon className="h-14 w-14" letter={selectedProject.title.charAt(0)} isLive={selectedProject.status === 'LIVE'} />
                                </div>
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold">{selectedProject.title}</div>
                                    <div className="text-xs text-[var(--text-secondary)]">{selectedProject.projectType}</div>
                                </div>
                            </div>
                            <PreviewProperty label="Status" value={selectedProject.status} />
                            <PreviewProperty label="Year" value={selectedProject.year} />
                            <PreviewProperty label="Stack" value={selectedProject.tech.join(', ')} />
                            <div className="mt-5 text-xs leading-6 text-[var(--text-secondary)]">{selectedProject.description}</div>
                            <div className="mt-auto space-y-2 pt-6">
                                <PreviewAction icon={ExternalLink} label="Open project" onClick={() => handleOpenProject(selectedProject)} />
                                {selectedProject.link ? <PreviewAction icon={Monitor} label="Open live site" onClick={() => window.open(selectedProject.link, '_blank', 'noopener,noreferrer')} /> : null}
                                {selectedProject.github && selectedProject.github !== '#' ? <PreviewAction icon={Github} label="Open source" onClick={() => window.open(selectedProject.github, '_blank', 'noopener,noreferrer')} /> : null}
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-[var(--text-secondary)]">No item selected</div>
                    )}
                </aside>
            </div>

            <div className="flex h-8 items-center justify-between border-t border-[var(--surface-glass-border)] bg-[var(--surface-elevated)] px-3 text-[11px] text-[var(--text-secondary)]">
                <div className="flex items-center gap-3">
                    <span>{sortedProjects.length} items</span>
                    <span>{projects.filter((project) => project.status === 'LIVE').length} live</span>
                </div>
                <div className="flex items-center gap-1">
                    <ViewToggle active={view === 'details'} icon={TableProperties} onClick={() => setView('details')} />
                    <ViewToggle active={view === 'list'} icon={List} onClick={() => setView('list')} />
                    <ViewToggle active={view === 'tiles'} icon={Grid2x2} onClick={() => setView('tiles')} />
                </div>
            </div>

            <AnimatePresence>
                {contextMenu ? (
                    <ProjectContextMenu
                        project={projects.find((item) => item.id === contextMenu.projectId) ?? null}
                        x={contextMenu.x}
                        y={contextMenu.y}
                        onClose={() => setContextMenu(null)}
                        onOpen={(project) => handleOpenProject(project)}
                    />
                ) : null}
            </AnimatePresence>
        </div>
    )
}

function ProjectsMobileApp() {
    const openApp = useOneUiStore((s) => s.openApp)
    const [query, setQuery] = useState('')
    const liveCount = projects.filter((item) => item.status === 'LIVE').length

    const filteredProjects = projects.filter((project) => {
        const normalized = query.trim().toLowerCase()
        if (!normalized) return true
        return (
            project.title.toLowerCase().includes(normalized) ||
            project.description.toLowerCase().includes(normalized) ||
            project.tech.some((item) => item.toLowerCase().includes(normalized))
        )
    })

    return (
        <div className="space-y-5 px-5 pb-8 pt-5">
            <OneUiCard className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="oneui-eyebrow">My Files</div>
                        <div className="text-[1.8rem] font-semibold tracking-[-0.05em] text-[var(--oneui-text)]">Internal storage</div>
                        <div className="mt-1 text-sm text-[var(--oneui-text-soft)]">Portfolio work organized like Samsung files and previews.</div>
                    </div>
                    <OneUiBadge>{filteredProjects.length} items</OneUiBadge>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <OneUiMetric label="Live" value={`${liveCount}`} tone="blue" />
                    <OneUiMetric label="Years" value={`${new Set(projects.map((item) => item.year)).size}`} tone="green" />
                    <OneUiMetric label="Types" value={`${new Set(projects.map((item) => item.projectType)).size}`} tone="amber" />
                </div>
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search projects"
                    className="oneui-input"
                />
            </OneUiCard>

            <OneUiSection title="Categories" eyebrow="Browse">
                <div className="grid grid-cols-2 gap-3">
                    {Array.from(new Set(projects.map((item) => item.projectType))).map((type) => (
                        <OneUiCard key={type} className="space-y-2">
                            <div className="text-lg font-semibold tracking-[-0.04em] text-[var(--oneui-text)]">{type}</div>
                            <div className="text-sm text-[var(--oneui-text-soft)]">{projects.filter((item) => item.projectType === type).length} files</div>
                        </OneUiCard>
                    ))}
                </div>
            </OneUiSection>

            <OneUiSection title="Recent files" eyebrow="Files">
                <div className="space-y-3">
                    {filteredProjects.map((project) => (
                        <button
                            key={project.id}
                            onClick={() => openApp('project-detail', { title: project.title, props: { project } })}
                            className="w-full text-left"
                        >
                            <OneUiCard className="space-y-3">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] bg-[var(--oneui-accent-soft)] text-[var(--oneui-accent)]">
                                        <FolderOpen size={22} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="text-lg font-semibold tracking-[-0.04em] text-[var(--oneui-text)]">{project.title}</div>
                                            <OneUiBadge>{project.status}</OneUiBadge>
                                        </div>
                                        <div className="mt-1 text-sm text-[var(--oneui-text-soft)]">{project.projectType} · {project.year}</div>
                                        <div className="mt-2 text-sm leading-6 text-[var(--oneui-text-soft)]">{project.description}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.slice(0, 3).map((tech) => <OneUiBadge key={tech}>{tech}</OneUiBadge>)}
                                </div>
                            </OneUiCard>
                        </button>
                    ))}
                </div>
            </OneUiSection>
        </div>
    )
}

function ToolbarIcon({ icon: Icon, disabled }: { icon: React.ComponentType<{ size?: number; className?: string }>; disabled?: boolean }) {
    return <button className={cn('flex h-7 w-7 items-center justify-center rounded-md transition-colors', disabled ? 'cursor-default text-[var(--text-tertiary)]' : 'hover:bg-[var(--glass-hover)] text-[var(--text-secondary)]')}><Icon size={15} /></button>
}

function CommandButton({ label, icon: Icon, onClick }: { label: string; icon: React.ComponentType<{ size?: number; className?: string }>; onClick?: () => void }) {
    return <button onClick={onClick} className="flex h-8 items-center gap-2 rounded-md px-3 text-[12px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-hover)] hover:text-[var(--text-primary)]"><Icon size={15} /><span>{label}</span></button>
}

function HeaderButton({ label, column, active, direction, onClick }: { label: string; column: keyof typeof DETAIL_COLUMN_SPECS; active: boolean; direction: 'asc' | 'desc'; onClick: () => void }) {
    return <button onClick={onClick} className="flex h-full items-center px-3 text-left hover:bg-[var(--glass-hover)]" style={getColumnStyle(column)}><span>{label}</span>{active ? <span className="ml-1 text-[10px]">{direction === 'asc' ? '^' : 'v'}</span> : null}</button>
}

function ExplorerTile({ project, selected, onClick, onDoubleClick, onContextMenu }: { project: Project; selected: boolean; onClick: () => void; onDoubleClick: () => void; onContextMenu: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    return <button onClick={onClick} onDoubleClick={onDoubleClick} onContextMenu={onContextMenu} className={cn('flex min-h-[132px] flex-col items-center rounded-md border border-transparent px-2 py-3 text-center transition-colors', selected ? 'bg-[var(--accent-primary-dim)] border-[var(--surface-glass-border)]' : 'hover:bg-[var(--glass-hover)]')}><Win11FolderIcon className="h-14 w-14" letter={project.title.charAt(0)} isLive={project.status === 'LIVE'} /><div className="mt-3 text-[12px] leading-5">{project.title}</div><div className="text-[10px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">{project.status}</div></button>
}

function ExplorerListRow({ project, selected, onClick, onDoubleClick, onContextMenu }: { project: Project; selected: boolean; onClick: () => void; onDoubleClick: () => void; onContextMenu: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    return <button onClick={onClick} onDoubleClick={onDoubleClick} onContextMenu={onContextMenu} className={cn('flex h-10 w-full items-center gap-3 px-4 text-left text-[12.5px] transition-colors', selected ? 'bg-[var(--accent-primary-dim)]' : 'hover:bg-[var(--glass-hover)]')}><Win11FolderIcon className="h-5 w-5" letter={project.title.charAt(0)} isLive={project.status === 'LIVE'} /><span className="truncate">{project.title}</span></button>
}

function ExplorerDetailsRow({ project, visibleColumns, selected, onClick, onDoubleClick, onContextMenu }: { project: Project; visibleColumns: { showStatus: boolean; showType: boolean; showTech: boolean; showYear: boolean }; selected: boolean; onClick: () => void; onDoubleClick: () => void; onContextMenu: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <button onClick={onClick} onDoubleClick={onDoubleClick} onContextMenu={onContextMenu} className={cn('flex h-10 w-full items-center border-b border-[color:rgba(255,255,255,0.03)] px-0 text-left text-[12.5px] transition-colors', selected ? 'bg-[var(--accent-primary-dim)]' : 'hover:bg-[var(--glass-hover)]')}>
            <div className="flex items-center gap-2 px-3" style={getColumnStyle('name')}><Win11FolderIcon className="h-5 w-5" letter={project.title.charAt(0)} isLive={project.status === 'LIVE'} /><span className="truncate">{project.title}</span></div>
            {visibleColumns.showStatus ? <div className="px-3 text-[var(--text-secondary)]" style={getColumnStyle('status')}>{project.status}</div> : null}
            {visibleColumns.showType ? <div className="px-3 text-[var(--text-secondary)]" style={getColumnStyle('type')}>{project.projectType}</div> : null}
            {visibleColumns.showTech ? <div className="truncate px-3 text-[var(--text-secondary)]" style={getColumnStyle('tech')}>{project.tech.join(', ')}</div> : null}
            {visibleColumns.showYear ? <div className="px-3 text-[var(--text-secondary)]" style={getColumnStyle('year')}>{project.year}</div> : null}
        </button>
    )
}

function getColumnStyle(column: keyof typeof DETAIL_COLUMN_SPECS) {
    const spec = DETAIL_COLUMN_SPECS[column]
    return { minWidth: `${spec.minWidth}px`, flex: spec.flex }
}

function PreviewProperty({ label, value }: { label: string; value: string }) {
    return <div className="mb-3"><div className="mb-1 text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">{label}</div><div className="text-sm text-[var(--text-primary)]">{value}</div></div>
}

function PreviewAction({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ size?: number }>; label: string; onClick: () => void }) {
    return <button onClick={onClick} className="flex w-full items-center gap-2 rounded-md border border-[var(--surface-glass-border)] bg-[var(--surface-base)] px-3 py-2 text-sm transition-colors hover:bg-[var(--glass-hover)]"><Icon size={15} /><span>{label}</span></button>
}

function ViewToggle({ active, icon: Icon, onClick }: { active: boolean; icon: React.ComponentType<{ size?: number }>; onClick: () => void }) {
    return <button onClick={onClick} className={cn('flex h-6 w-6 items-center justify-center rounded-sm transition-colors', active ? 'bg-[var(--glass-hover)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--glass-hover)]')}><Icon size={13} /></button>
}

function ProjectContextMenu({ project, x, y, onClose, onOpen }: { project: Project | null; x: number; y: number; onClose: () => void; onOpen: (project: Project) => void }) {
    if (!project) return null

    const items = [
        { label: 'Open', action: () => onOpen(project) },
        project.link ? { label: 'Open live site', action: () => window.open(project.link, '_blank', 'noopener,noreferrer') } : null,
        project.github && project.github !== '#' ? { label: 'Open source', action: () => window.open(project.github, '_blank', 'noopener,noreferrer') } : null,
    ].filter(Boolean) as { label: string; action: () => void }[]

    return (
        <>
            <div className="fixed inset-0 z-[10000]" onClick={onClose} onContextMenu={(event) => event.preventDefault()} />
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} style={{ left: Math.max(8, x), top: Math.max(8, y) }} className="fixed z-[10001] min-w-[200px] rounded-xl border border-[var(--surface-glass-border)] bg-[var(--surface-overlay)] p-1.5 shadow-2xl backdrop-blur-2xl">
                {items.map((item) => (
                    <button key={item.label} onClick={() => { item.action(); onClose() }} className="flex w-full items-center rounded-lg px-3 py-2 text-left text-[12px] transition-colors hover:bg-[var(--glass-hover)]">
                        {item.label}
                    </button>
                ))}
            </motion.div>
        </>
    )
}
