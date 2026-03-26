'use client'

import { ArrowLeft, Github, Globe } from 'lucide-react'
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
                <OneUiCard className="space-y-4">
                    <div className="aspect-[16/10] rounded-[1.75rem] bg-gradient-to-br from-[var(--oneui-accent-soft)] via-white/50 to-transparent" />
                    <div className="space-y-3">
                        <div className="text-2xl font-semibold tracking-[-0.05em] text-[var(--oneui-text)]">{project.title}</div>
                        <div className="flex flex-wrap gap-2">
                            <OneUiBadge>{project.projectType}</OneUiBadge>
                            <OneUiBadge>{project.year}</OneUiBadge>
                            <OneUiBadge>{project.status}</OneUiBadge>
                        </div>
                        <p className="text-sm leading-6 text-[var(--oneui-text-soft)]">{project.description}</p>
                    </div>
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

                <OneUiSection title="Tech stack" eyebrow="Details">
                    <OneUiCard className="flex flex-wrap gap-2">
                        {project.tech.map((item) => <OneUiBadge key={item}>{item}</OneUiBadge>)}
                    </OneUiCard>
                </OneUiSection>

                <OneUiSection title="What shipped" eyebrow="Summary">
                    <OneUiCard className="space-y-3">
                        <BulletPoint>Responsive interface aligned to the portfolio brand.</BulletPoint>
                        <BulletPoint>Production-ready build using the tools listed in the stack.</BulletPoint>
                        <BulletPoint>Public-facing delivery with design and technical execution.</BulletPoint>
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

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24">
                <div className="relative aspect-video rounded-2xl bg-[var(--surface-elevated)] border border-white/5 overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 to-transparent" />
                    <span className="text-[var(--accent-primary)] font-bold text-xl opacity-40 group-hover:scale-110 transition-transform duration-500">
                        {project.title} Preview
                    </span>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-[var(--accent-primary)] hidden md:block">{project.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <span key={t} className="px-3 py-1 rounded-full bg-[var(--surface-elevated)] text-[10px] uppercase tracking-wider font-bold border border-white/5">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed opacity-80">{project.description}</p>

                    <div className="grid gap-4 sm:flex sm:items-center">
                        {project.link ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-black font-bold hover:brightness-110 transition-all">
                                <Globe size={18} />
                                View Live Site
                            </a>
                        ) : null}
                        <a href="#" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--surface-elevated)] border border-white/5 font-bold hover:bg-[var(--surface-glass-border)] transition-all">
                            <Github size={18} />
                            Source Code
                        </a>
                    </div>
                </div>

                <div className="glass-surface p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="font-bold text-lg">Key Features</h3>
                    <ul className="list-disc list-inside space-y-2 opacity-70 text-sm">
                        <li>High performance architecture with Next.js</li>
                        <li>Responsive and accessible design</li>
                        <li>Automated deployment pipeline</li>
                        <li>Integrated analytics & monitoring</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function BulletPoint({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-3 text-sm text-[var(--oneui-text-soft)]">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--oneui-accent)]" />
            <span className="leading-6">{children}</span>
        </div>
    )
}
