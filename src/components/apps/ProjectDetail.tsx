'use client'

import { ArrowLeft, Github, Globe, Info, Layers3 } from 'lucide-react'
import { Project } from '../../types/project'
import { OneUiBadge, OneUiCard, OneUiPrimaryButton, OneUiSection, OneUiSecondaryButton } from '../oneui/OneUiPrimitives'

interface ProjectDetailProps {
    project: Project
    onBack: () => void
    isMobile?: boolean
}

export function ProjectDetail({ project, onBack, isMobile }: ProjectDetailProps) {
    if (isMobile) {
        return (
            <div className="space-y-5 px-5 pb-8 pt-5">
                <OneUiCard className="space-y-4 overflow-hidden">
                    <div className="aspect-[16/11] rounded-[1.9rem] bg-[linear-gradient(135deg,rgba(110,145,255,0.34),rgba(255,255,255,0.6),rgba(110,145,255,0.08))] p-5">
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex justify-between">
                                <OneUiBadge>{project.projectType}</OneUiBadge>
                                <OneUiBadge>{project.status}</OneUiBadge>
                            </div>
                            <div>
                                <div className="text-[2rem] font-semibold tracking-[-0.06em] text-[var(--oneui-text)]">{project.title}</div>
                                <div className="mt-1 text-sm text-[var(--oneui-text-soft)]">{project.year}</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm leading-6 text-[var(--oneui-text-soft)]">{project.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                        {project.link ? (
                            <OneUiPrimaryButton onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}>
                                <Globe size={16} />
                                Open live
                            </OneUiPrimaryButton>
                        ) : <div />}
                        {project.github && project.github !== '#' ? (
                            <OneUiSecondaryButton onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}>
                                <Github size={16} />
                                Source
                            </OneUiSecondaryButton>
                        ) : null}
                    </div>
                </OneUiCard>

                <OneUiSection title="Details" eyebrow="Gallery">
                    <OneUiCard className="divide-y divide-[var(--oneui-border)] py-0">
                        <GalleryRow label="Type" value={project.projectType} />
                        <GalleryRow label="Year" value={project.year} />
                        <GalleryRow label="Status" value={project.status} />
                    </OneUiCard>
                </OneUiSection>

                <OneUiSection title="Tech stack" eyebrow="Metadata">
                    <OneUiCard className="flex flex-wrap gap-2">
                        {project.tech.map((item) => <OneUiBadge key={item}>{item}</OneUiBadge>)}
                    </OneUiCard>
                </OneUiSection>

                <OneUiSection title="What shipped" eyebrow="Summary">
                    <OneUiCard className="space-y-3">
                        <BulletPoint icon={Layers3}>Responsive interface aligned to the portfolio brand.</BulletPoint>
                        <BulletPoint icon={Info}>Production-ready build using the tools listed in the stack.</BulletPoint>
                        <BulletPoint icon={Globe}>Public-facing delivery with design and technical execution.</BulletPoint>
                    </OneUiCard>
                </OneUiSection>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-[var(--surface-base)] animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-4 p-4 border-b border-white/5 md:hidden">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-[var(--surface-elevated)] transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="font-bold truncate">{project.title}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6">Desktop detail unchanged.</div>
        </div>
    )
}

function GalleryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="oneui-row">
            <div className="oneui-row-title">{label}</div>
            <div className="text-sm text-[var(--oneui-text-soft)]">{value}</div>
        </div>
    )
}

function BulletPoint({ icon: Icon, children }: { icon: typeof Info; children: React.ReactNode }) {
    return (
        <div className="flex gap-3 text-sm text-[var(--oneui-text-soft)]">
            <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--oneui-accent-soft)] text-[var(--oneui-accent)]">
                <Icon size={13} />
            </span>
            <span className="leading-6">{children}</span>
        </div>
    )
}
