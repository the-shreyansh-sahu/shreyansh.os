'use client'

import { Download, Briefcase, GraduationCap, CalendarDays, StickyNote } from 'lucide-react'
import { experiences } from '../../data/experience'
import { OneUiBadge, OneUiCard, OneUiPrimaryButton, OneUiSection } from '../oneui/OneUiPrimitives'

interface ResumeAppProps {
    isMobile?: boolean
    initialTab?: 'resume' | 'experience'
}

export default function ResumeApp({ isMobile, initialTab = 'resume' }: ResumeAppProps) {
    if (isMobile) {
        return <ResumeMobileApp initialTab={initialTab} />
    }

    return (
        <div className="p-6 space-y-10 animate-in fade-in duration-500 pb-24 max-w-2xl mx-auto">
            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--accent-primary)]">Curriculum Vitae</h1>
                    <p className="opacity-60 text-sm">Professional summary and experience history.</p>
                </div>
                <a href="/Shreyansh_Sahu_Resume.pdf" download className="px-5 py-2.5 rounded-xl bg-[var(--surface-elevated)] border border-white/10 flex items-center justify-center gap-2 text-xs font-bold hover:bg-[var(--surface-glass-border)] transition-all">
                    <Download size={16} />
                    Download PDF
                </a>
            </header>

            <section className="space-y-6">
                <h2 className="text-sm font-bold flex items-center gap-2 opacity-50 uppercase tracking-widest">
                    <Briefcase size={16} />
                    Experience
                </h2>
                <div className="space-y-8">
                    {experiences.map((exp, i) => (
                        <div key={i} className="relative pl-6 border-l border-white/10 group">
                            <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] rounded-full bg-[var(--surface-glass-border)] transition-colors group-hover:bg-[var(--accent-primary)]" />
                            <div className="space-y-1">
                                <h3 className="font-bold">{exp.role}</h3>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-60">
                                    <span className="text-[var(--accent-primary)] font-semibold">{exp.company}</span>
                                    <span>-</span>
                                    <span>{exp.period}</span>
                                    {exp.location ? <span>- {exp.location}</span> : null}
                                </div>
                                <p className="text-xs leading-relaxed opacity-70 pt-2">{exp.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

function ResumeMobileApp({ initialTab }: { initialTab: 'resume' | 'experience' }) {
    const isExperienceView = initialTab === 'experience'

    return (
        <div className="space-y-5 px-5 pb-8 pt-5">
            <OneUiCard className="space-y-4 overflow-hidden">
                <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(244,196,92,0.26),rgba(255,255,255,0.08))] p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="oneui-eyebrow">{isExperienceView ? 'Calendar' : 'Samsung Notes'}</div>
                            <div className="text-[1.95rem] font-semibold tracking-[-0.06em] text-[var(--oneui-text)]">
                                {isExperienceView ? 'Career Calendar' : 'Career Notebook'}
                            </div>
                        </div>
                        <OneUiBadge>{isExperienceView ? 'Timeline' : 'Resume'}</OneUiBadge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--oneui-text-soft)]">
                        Founder, chairperson, builder, and student ambassador across healthcare, technology, events, and mentorship.
                    </p>
                    <div className="mt-4 flex gap-3">
                        <OneUiPrimaryButton className="flex-1" onClick={() => window.open('/Shreyansh_Sahu_Resume.pdf', '_blank')}>
                            Download PDF
                        </OneUiPrimaryButton>
                    </div>
                </div>
            </OneUiCard>

            {!isExperienceView ? (
                <>
                    <OneUiSection title="Pinned notes" eyebrow="Notes">
                        <div className="grid grid-cols-2 gap-3">
                            <PinnedNote title="Founder" subtitle="Aarogyan Foundation" tone="bg-[#ffe59a] text-[#4d3b00]" />
                            <PinnedNote title="IBM" subtitle="Student Ambassador" tone="bg-[#fff1c8] text-[#4d3b00]" />
                            <PinnedNote title="6+" subtitle="Years building for web" tone="bg-[#dff0ff] text-[#123757]" />
                            <PinnedNote title="300+" subtitle="Students mentored" tone="bg-[#e8f8e8] text-[#1e4f32]" />
                        </div>
                    </OneUiSection>

                    <OneUiSection title="Notebook pages" eyebrow="Resume">
                        <div className="space-y-3">
                            <OneUiCard className="space-y-3">
                                <div className="flex items-center gap-2 text-[var(--oneui-text-soft)]"><StickyNote size={16} />Summary</div>
                                <div className="text-sm leading-6 text-[var(--oneui-text-soft)]">
                                    Young entrepreneur and product builder focused on healthcare impact, digital experiences, and student mentorship.
                                </div>
                            </OneUiCard>
                            <OneUiCard className="space-y-3">
                                <div className="flex items-center gap-2 text-[var(--oneui-text-soft)]"><GraduationCap size={16} />Education</div>
                                <div className="text-lg font-semibold tracking-[-0.04em] text-[var(--oneui-text)]">GD Goenka Public School</div>
                                <div className="text-sm text-[var(--oneui-text-soft)]">AISSCE · Gurugram</div>
                                <OneUiBadge>Grade 10: 93.2%</OneUiBadge>
                            </OneUiCard>
                        </div>
                    </OneUiSection>
                </>
            ) : null}

            <OneUiSection title={isExperienceView ? 'Upcoming and ongoing' : 'Experience'} eyebrow={isExperienceView ? 'Calendar' : 'Timeline'}>
                <div className="space-y-3">
                    {experiences.slice(0, 6).map((exp) => (
                        <OneUiCard key={`${exp.company}-${exp.role}`} className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-lg font-semibold tracking-[-0.04em] text-[var(--oneui-text)]">{exp.role}</div>
                                    <div className="text-sm text-[var(--oneui-text-soft)]">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                                </div>
                                <span className="rounded-full bg-[var(--oneui-surface-2)] px-3 py-1 text-[11px] font-semibold text-[var(--oneui-text-soft)]">
                                    {isExperienceView ? <CalendarDays size={13} className="inline mr-1" /> : <Briefcase size={13} className="inline mr-1" />}
                                    {exp.period}
                                </span>
                            </div>
                            <p className="text-sm leading-6 text-[var(--oneui-text-soft)]">{exp.details}</p>
                        </OneUiCard>
                    ))}
                </div>
            </OneUiSection>

            {!isExperienceView ? (
                <OneUiSection title="Highlights" eyebrow="Pinned">
                    <div className="grid grid-cols-2 gap-3">
                        <HighlightTile title="IBM" subtitle="Student Ambassador" />
                        <HighlightTile title="Aarogyan" subtitle="Founder" />
                        <HighlightTile title="6+" subtitle="Years building for web" />
                        <HighlightTile title="300+" subtitle="Students mentored" />
                    </div>
                </OneUiSection>
            ) : null}
        </div>
    )
}

function PinnedNote({ title, subtitle, tone }: { title: string; subtitle: string; tone: string }) {
    return (
        <div className={`rounded-[1.6rem] px-4 py-5 shadow-[0_10px_18px_rgba(211,170,58,0.14)] ${tone}`}>
            <div className="text-sm font-semibold">{title}</div>
            <div className="mt-2 text-xs leading-5 opacity-80">{subtitle}</div>
        </div>
    )
}

function HighlightTile({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <OneUiCard className="space-y-2">
            <div className="text-2xl font-semibold tracking-[-0.05em] text-[var(--oneui-text)]">{title}</div>
            <div className="text-sm text-[var(--oneui-text-soft)]">{subtitle}</div>
        </OneUiCard>
    )
}
