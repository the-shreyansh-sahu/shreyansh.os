'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    Activity,
    BadgeCheck,
    BookText,
    BriefcaseBusiness,
    ChevronRight,
    Cpu,
    Drama,
    Globe2,
    MessageSquareMore,
    Search,
} from 'lucide-react'
import { skills, Skill } from '../../data/skills'
import { cn } from '../../lib/cn'
import { OneUiBadge, OneUiCard, OneUiMetric, OneUiSection } from '../oneui/OneUiPrimitives'

interface SkillsAppProps {
    isMobile?: boolean
}

type SkillCategory = Skill['category']

const CATEGORY_META: Record<SkillCategory, { label: string; icon: typeof Cpu; accent: string; subtitle: string }> = {
    technical: { label: 'Technical Skills', icon: Cpu, accent: 'var(--accent-primary)', subtitle: 'Development stack, tooling, and shipping capability' },
    leadership: { label: 'Leadership & Entrepreneurship', icon: BriefcaseBusiness, accent: 'var(--accent-amber)', subtitle: 'Strategy, operations, fundraising, and execution' },
    performing: { label: 'Performing Arts', icon: Drama, accent: 'var(--accent-purple)', subtitle: 'Direction, acting, stagecraft, and production' },
    interpersonal: { label: 'Interpersonal Skills', icon: MessageSquareMore, accent: 'var(--accent-green)', subtitle: 'Mentorship, communication, collaboration, and outreach' },
    language: { label: 'Languages', icon: Globe2, accent: 'var(--accent-red)', subtitle: 'Native and bilingual language fluency' },
}

const CATEGORY_ORDER: SkillCategory[] = ['technical', 'leadership', 'performing', 'interpersonal', 'language']

export default function SkillsApp({ isMobile }: SkillsAppProps) {
    const rootRef = useRef<HTMLDivElement>(null)
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('technical')
    const [query, setQuery] = useState('')
    const [containerWidth, setContainerWidth] = useState(0)

    const grouped = useMemo(() => {
        return CATEGORY_ORDER.map((category) => {
            const items = skills.filter((skill) => skill.category === category)
            const average = Math.round(items.reduce((sum, skill) => sum + skill.level, 0) / Math.max(items.length, 1))
            return { category, items, average }
        })
    }, [])

    const activeGroup = grouped.find((group) => group.category === selectedCategory) ?? grouped[0]
    const filteredSkills = activeGroup.items.filter((skill) => skill.name.toLowerCase().includes(query.trim().toLowerCase()))
    const overallAverage = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)
    const highestSkill = [...activeGroup.items].sort((a, b) => b.level - a.level)[0]
    const activeMeta = CATEGORY_META[selectedCategory]
    const showSidebar = containerWidth >= 960
    const showSummaryRail = containerWidth >= 1080
    const compactHeader = containerWidth < 720
    const compactProcessTable = containerWidth < 760

    useEffect(() => {
        const node = rootRef.current
        if (!node) return
        const observer = new ResizeObserver((entries) => setContainerWidth(entries[0]?.contentRect.width ?? 0))
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    if (isMobile) {
        return <SkillsMobileApp />
    }

    return (
        <div ref={rootRef} className="flex h-full min-h-full bg-[var(--surface-base)] text-[var(--text-primary)]">
            <aside className={cn('w-[260px] flex-col border-r border-[var(--surface-glass-border)] bg-[var(--surface-elevated)]/88 backdrop-blur-xl', showSidebar ? 'flex' : 'hidden')}>
                <div className="px-5 py-4 border-b border-[var(--surface-glass-border)]">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Task Manager</div>
                    <div className="mt-1 text-lg font-semibold">Performance</div>
                </div>
                <div className="p-2 space-y-1 overflow-y-auto">
                    {grouped.map((group) => {
                        const meta = CATEGORY_META[group.category]
                        const Icon = meta.icon
                        return (
                            <button key={group.category} onClick={() => setSelectedCategory(group.category)} className={cn('w-full rounded-xl px-3 py-3 text-left transition-colors border', selectedCategory === group.category ? 'bg-[var(--accent-primary-dim)] border-[var(--surface-glass-border)]' : 'bg-transparent border-transparent hover:bg-[var(--glass-hover)]')}>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--surface-glass-border)]" style={{ backgroundColor: 'color-mix(in srgb, var(--surface-elevated) 80%, white 4%)' }}>
                                        <Icon size={18} style={{ color: meta.accent }} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-medium">{meta.label}</div>
                                        <div className="text-[11px] text-[var(--text-secondary)]">{group.average}% average</div>
                                    </div>
                                </div>
                                <div className="mt-3 h-10 overflow-hidden rounded-md bg-[var(--surface-base)]/70 px-1 py-1"><Sparkline level={group.average} color={meta.accent} /></div>
                            </button>
                        )
                    })}
                </div>
            </aside>

            <main className="flex min-w-0 flex-1 flex-col bg-[var(--surface-base)]">
                <div className={cn('flex gap-3 border-b border-[var(--surface-glass-border)] px-4 py-4 sm:px-6', compactHeader ? 'flex-col' : 'flex-row items-center justify-between')}>
                    <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-tertiary)]">Skills Monitor</div>
                        <div className="mt-1 text-2xl font-semibold">{activeMeta.label}</div>
                    </div>
                    <div className={cn('text-left', compactHeader ? '' : 'text-right')}>
                        <div className="text-3xl font-light">{activeGroup.average}%</div>
                        <div className="text-xs text-[var(--text-secondary)]">Active capability</div>
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto bg-[var(--surface-base)]">
                    <div className={cn('grid gap-4 p-4 sm:p-6', showSummaryRail ? 'grid-cols-[minmax(0,1.35fr)_320px]' : 'grid-cols-1')}>
                        <section className="space-y-4 min-w-0">
                            {!showSidebar ? (
                                <div className="rounded-2xl border border-[var(--surface-glass-border)] bg-[var(--surface-elevated)]/72 p-3">
                                    <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Performance</div>
                                    <div className="flex gap-3 overflow-x-auto pb-1">
                                        {grouped.map((group) => {
                                            const meta = CATEGORY_META[group.category]
                                            const Icon = meta.icon
                                            return (
                                                <button key={group.category} onClick={() => setSelectedCategory(group.category)} className={cn('min-w-[220px] rounded-xl px-3 py-3 text-left transition-colors border', selectedCategory === group.category ? 'bg-[var(--accent-primary-dim)] border-[var(--surface-glass-border)]' : 'bg-transparent border-transparent hover:bg-[var(--glass-hover)]')}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--surface-glass-border)]" style={{ backgroundColor: 'color-mix(in srgb, var(--surface-elevated) 80%, white 4%)' }}>
                                                            <Icon size={18} style={{ color: meta.accent }} />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="truncate text-sm font-medium">{meta.label}</div>
                                                            <div className="text-[11px] text-[var(--text-secondary)]">{group.average}% average</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 h-10 overflow-hidden rounded-md bg-[var(--surface-base)]/70 px-1 py-1"><Sparkline level={group.average} color={meta.accent} /></div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ) : null}

                            <div className="rounded-2xl border border-[var(--surface-glass-border)] bg-[var(--surface-elevated)]/72 p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm font-semibold"><Activity size={16} style={{ color: activeMeta.accent }} />{activeMeta.label}</div>
                                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">{activeMeta.subtitle}</p>
                                    </div>
                                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--surface-glass-border)] bg-[var(--surface-base)]"><activeMeta.icon size={22} style={{ color: activeMeta.accent }} /></div>
                                </div>
                                <div className="mt-5 rounded-xl border border-[var(--surface-glass-border)] bg-[var(--surface-base)] p-4">
                                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]"><span>Usage</span><span>{activeGroup.average}%</span></div>
                                    <div className="mt-4 h-[220px]"><PerformanceGraph color={activeMeta.accent} values={activeGroup.items.map((skill) => skill.level)} /></div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[var(--surface-glass-border)] bg-[var(--surface-elevated)]/72 overflow-hidden">
                                <div className={cn('flex gap-3 border-b border-[var(--surface-glass-border)] px-4 py-4 sm:px-5', compactHeader ? 'flex-col' : 'flex-row items-center justify-between')}>
                                    <div className="text-sm font-semibold">Processes</div>
                                    <div className={cn('flex w-full items-center rounded-lg border border-[var(--surface-glass-border)] bg-[var(--surface-base)] px-3 py-2 text-xs', compactHeader ? '' : 'max-w-[280px]')}>
                                        <Search size={14} className="mr-2 text-[var(--text-tertiary)]" />
                                        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skills" className="w-full bg-transparent outline-none placeholder:text-[var(--text-tertiary)]" />
                                    </div>
                                </div>
                                <div className={cn('grid grid-cols-[minmax(0,1.6fr)_100px_130px] border-b border-[var(--surface-glass-border)] px-4 py-3 sm:px-5 text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]', compactProcessTable ? 'hidden' : '')}>
                                    <span>Name</span><span>Impact</span><span className="text-right">Usage</span>
                                </div>
                                <div className="max-h-[420px] overflow-y-auto">
                                    {filteredSkills.map((skill) => <SkillProcessRow key={skill.name} skill={skill} accent={activeMeta.accent} />)}
                                    {filteredSkills.length === 0 ? <div className="px-5 py-8 text-sm text-[var(--text-secondary)]">No matching skills in this group.</div> : null}
                                </div>
                            </div>

                            {!showSummaryRail ? (
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    <MetricCard icon={BadgeCheck} label="Overall Average" value={`${overallAverage}%`} hint="Across all resume-listed skills" />
                                    <MetricCard icon={BookText} label="Highest In View" value={highestSkill ? `${highestSkill.name}` : 'N/A'} hint={highestSkill ? `${highestSkill.level}% proficiency` : 'No data'} />
                                    <MetricCard icon={ChevronRight} label="Tracked Skills" value={`${activeGroup.items.length}`} hint="In the selected category" />
                                </div>
                            ) : null}
                        </section>

                        <aside className={cn('space-y-4', showSummaryRail ? '' : 'hidden')}>
                            <MetricCard icon={BadgeCheck} label="Overall Average" value={`${overallAverage}%`} hint="Across all resume-listed skills" />
                            <MetricCard icon={BookText} label="Highest In View" value={highestSkill ? `${highestSkill.name}` : 'N/A'} hint={highestSkill ? `${highestSkill.level}% proficiency` : 'No data'} />
                            <MetricCard icon={ChevronRight} label="Tracked Skills" value={`${activeGroup.items.length}`} hint="In the selected category" />
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    )
}

function SkillsMobileApp() {
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('technical')
    const grouped = CATEGORY_ORDER.map((category) => {
        const items = skills.filter((skill) => skill.category === category)
        const average = Math.round(items.reduce((sum, skill) => sum + skill.level, 0) / Math.max(items.length, 1))
        return { category, items, average }
    })
    const activeGroup = grouped.find((group) => group.category === selectedCategory) ?? grouped[0]
    const activeMeta = CATEGORY_META[selectedCategory]
    const overallAverage = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)

    return (
        <div className="space-y-5 px-5 pb-8 pt-5">
            <OneUiCard className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="oneui-eyebrow">Device Care</div>
                        <div className="text-[1.8rem] font-semibold tracking-[-0.05em] text-[var(--oneui-text)]">Optimising now</div>
                        <div className="mt-1 text-sm text-[var(--oneui-text-soft)]">Samsung-style diagnostics for capability, leadership, and craft.</div>
                    </div>
                    <OneUiBadge>{overallAverage}%</OneUiBadge>
                </div>
                <div className="rounded-[2rem] bg-[var(--oneui-surface-2)] px-5 py-6">
                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[var(--oneui-accent-soft)] bg-[var(--oneui-surface)]">
                        <div className="text-center">
                            <div className="text-[2.2rem] font-semibold tracking-[-0.08em] text-[var(--oneui-text)]">{activeGroup.average}</div>
                            <div className="text-sm text-[var(--oneui-text-soft)]">Score</div>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <OneUiMetric label="Overall" value={`${overallAverage}%`} tone="blue" />
                        <OneUiMetric label="Active" value={`${activeGroup.average}%`} tone="green" />
                        <OneUiMetric label="Tracked" value={`${activeGroup.items.length}`} tone="amber" />
                    </div>
                </div>
            </OneUiCard>

            <OneUiSection title="Care modules" eyebrow="Categories">
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {grouped.map((group) => {
                        const meta = CATEGORY_META[group.category]
                        return (
                            <button key={group.category} onClick={() => setSelectedCategory(group.category)} className="min-w-[190px] text-left">
                                <OneUiCard className={cn('space-y-2', selectedCategory === group.category ? 'ring-2 ring-[var(--oneui-accent)]' : '')}>
                                    <div className="text-lg font-semibold tracking-[-0.04em] text-[var(--oneui-text)]">{meta.label}</div>
                                    <div className="text-sm text-[var(--oneui-text-soft)]">{group.average}% health score</div>
                                </OneUiCard>
                            </button>
                        )
                    })}
                </div>
            </OneUiSection>

            <OneUiSection title={activeMeta.label} eyebrow="Status">
                <OneUiCard className="space-y-4">
                    <div className="text-sm leading-6 text-[var(--oneui-text-soft)]">{activeMeta.subtitle}</div>
                    <div className="space-y-3">
                        {activeGroup.items.map((skill) => (
                            <div key={skill.name}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium text-[var(--oneui-text)]">{skill.name}</span>
                                    <span className="text-[var(--oneui-text-soft)]">{skill.level}%</span>
                                </div>
                                <div className="oneui-slider-track">
                                    <div className="oneui-slider-fill" style={{ width: `${skill.level}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </OneUiCard>
            </OneUiSection>
        </div>
    )
}

function SkillProcessRow({ skill, accent }: { skill: Skill; accent: string }) {
    const impact = skill.level >= 90 ? 'Very high' : skill.level >= 80 ? 'High' : skill.level >= 70 ? 'Moderate' : 'Low'
    return (
        <div className="grid gap-2 border-b border-[color:rgba(255,255,255,0.04)] px-4 py-3 transition-colors hover:bg-[var(--glass-hover)] sm:grid-cols-[minmax(0,1.6fr)_100px_130px] sm:items-center sm:gap-4 sm:px-5">
            <div className="min-w-0"><div className="truncate text-sm font-medium">{skill.name}</div><div className="mt-1 text-[11px] text-[var(--text-secondary)] capitalize">{skill.category}</div></div>
            <div className="text-xs text-[var(--text-secondary)] sm:text-left"><span className="sm:hidden text-[var(--text-tertiary)] uppercase tracking-[0.12em] mr-2">Impact</span>{impact}</div>
            <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="h-2 w-16 overflow-hidden rounded-full bg-[var(--surface-base)] border border-[var(--surface-glass-border)]"><div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: accent }} /></div>
                <div className="flex items-center gap-2"><span className="sm:hidden text-[var(--text-tertiary)] uppercase tracking-[0.12em] text-[11px]">Usage</span><div className="w-10 text-right text-sm tabular-nums">{skill.level}%</div></div>
            </div>
        </div>
    )
}

function MetricCard({ icon: Icon, label, value, hint }: { icon: typeof Activity; label: string; value: string; hint: string }) {
    return <div className="rounded-2xl border border-[var(--surface-glass-border)] bg-[var(--surface-elevated)]/72 p-5"><div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]"><Icon size={14} />{label}</div><div className="mt-3 text-lg font-semibold leading-7">{value}</div><div className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{hint}</div></div>
}

function Sparkline({ level, color }: { level: number; color: string }) {
    const points = [12, 18, 14, 22, 20, level * 0.22, 18, level * 0.18].map((value, index) => `${index * 14},${32 - Math.min(value, 28)}`).join(' ')
    return <svg viewBox="0 0 100 32" className="h-full w-full"><polyline fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={points} /></svg>
}

function PerformanceGraph({ values, color }: { values: number[]; color: string }) {
    const plotted = values.length > 0 ? values : [0]
    const points = plotted.map((value, index) => `${(index / Math.max(plotted.length - 1, 1)) * 100},${100 - value}`).join(' ')
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            <defs><linearGradient id="task-manager-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.35" /><stop offset="100%" stopColor={color} stopOpacity="0.02" /></linearGradient></defs>
            {Array.from({ length: 6 }).map((_, i) => <line key={`h-${i}`} x1="0" y1={i * 20} x2="100" y2={i * 20} stroke="currentColor" opacity="0.08" vectorEffect="non-scaling-stroke" />)}
            {Array.from({ length: 8 }).map((_, i) => <line key={`v-${i}`} x1={i * 14.285} y1="0" x2={i * 14.285} y2="100" stroke="currentColor" opacity="0.08" vectorEffect="non-scaling-stroke" />)}
            <polygon points={`0,100 ${points} 100,100`} fill="url(#task-manager-fill)" />
            <polyline fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" points={points} />
        </svg>
    )
}
