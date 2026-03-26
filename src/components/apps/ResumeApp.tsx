'use client'

import { Download, Briefcase, GraduationCap, Award } from 'lucide-react'
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
                                {exp.output ? (
                                    <a href={exp.output} target="_blank" rel="noopener noreferrer" className="inline-flex pt-2 text-[11px] font-medium text-[var(--accent-primary)] hover:underline">
                                        View output
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-sm font-bold flex items-center gap-2 opacity-50 uppercase tracking-widest">
                    <GraduationCap size={16} />
                    Education
                </h2>
                <div className="glass-surface p-5 rounded-2xl border border-white/5 space-y-1">
                    <h3 className="font-bold text-sm">All India Senior School Certificate Examination (AISSCE)</h3>
                    <p className="text-xs opacity-60">GD Goenka Public School, Sector 48, Gurugram</p>
                    <p className="text-xs opacity-60">April 2017 - April 2026</p>
                    <p className="text-xs opacity-60">Subjects: English, Physics, Chemistry, Mathematics, Computer Science</p>
                    <p className="text-xs opacity-60">Grade 10: 93.2%</p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-sm font-bold flex items-center gap-2 opacity-50 uppercase tracking-widest">
                    <Award size={16} />
                    Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InfoBadge title="IBM Student Ambassador" />
                    <InfoBadge title="6+ Years in Full-Stack Web Development" />
                    <InfoBadge title="Founder, Aarogyan Foundation" />
                    <InfoBadge title="300+ Students Mentored" />
                </div>
            </section>
        </div>
    )
}

function ResumeMobileApp({ initialTab }: { initialTab: 'resume' | 'experience' }) {
    return (
        <div className="space-y-5 px-5 pb-8 pt-5">
            <OneUiCard className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="oneui-eyebrow">Samsung Notes</div>
                        <div className="text-[1.8rem] font-semibold tracking-[-0.05em] text-[var(--oneui-text)]">Career Notebook</div>
                    </div>
                    <OneUiBadge>{initialTab === 'experience' ? 'Experience' : 'Resume'}</OneUiBadge>
                </div>
                <p className="text-sm leading-6 text-[var(--oneui-text-soft)]">
                    Founder, chairperson, builder, and student ambassador with a portfolio that spans healthcare, events, and digital products.
                </p>
                <OneUiPrimaryButton onClick={() => window.open('/Shreyansh_Sahu_Resume.pdf', '_blank')}>Download PDF</OneUiPrimaryButton>
            </OneUiCard>

            <OneUiSection title="Pinned notes" eyebrow="Notes">
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[1.6rem] bg-[#ffe59a] px-4 py-5 text-[#4d3b00] shadow-[0_10px_18px_rgba(211,170,58,0.18)]">
                        <div className="text-sm font-semibold">Founder</div>
                        <div className="mt-2 text-xs leading-5 opacity-80">Aarogyan Foundation</div>
                    </div>
                    <div className="rounded-[1.6rem] bg-[#fff1c8] px-4 py-5 text-[#4d3b00] shadow-[0_10px_18px_rgba(211,170,58,0.14)]">
                        <div className="text-sm font-semibold">IBM</div>
                        <div className="mt-2 text-xs leading-5 opacity-80">Student Ambassador</div>
                    </div>
                </div>
            </OneUiSection>

            <OneUiSection title="Experience" eyebrow="Timeline">
                <div className="space-y-3">
                    {experiences.slice(0, 6).map((exp) => (
                        <OneUiCard key={`${exp.company}-${exp.role}`} className="space-y-2">
                            <div className="text-lg font-semibold tracking-[-0.04em] text-[var(--oneui-text)]">{exp.role}</div>
                            <div className="text-sm text-[var(--oneui-text-soft)]">{exp.company} {exp.location ? `· ${exp.location}` : ''}</div>
                            <div className="text-xs uppercase tracking-[0.14em] text-[var(--oneui-text-faint)]">{exp.period}</div>
                            <p className="text-sm leading-6 text-[var(--oneui-text-soft)]">{exp.details}</p>
                        </OneUiCard>
                    ))}
                </div>
            </OneUiSection>

            <OneUiSection title="Education" eyebrow="Academic">
                <OneUiCard className="space-y-2">
                    <div className="text-lg font-semibold tracking-[-0.04em] text-[var(--oneui-text)]">GD Goenka Public School</div>
                    <div className="text-sm text-[var(--oneui-text-soft)]">AISSCE · Gurugram</div>
                    <div className="text-sm leading-6 text-[var(--oneui-text-soft)]">
                        Physics, Chemistry, Mathematics, Computer Science, English
                    </div>
                    <OneUiBadge>Grade 10: 93.2%</OneUiBadge>
                </OneUiCard>
            </OneUiSection>

            <OneUiSection title="Highlights" eyebrow="Pinned">
                <div className="grid grid-cols-2 gap-3">
                    <HighlightTile title="IBM" subtitle="Student Ambassador" />
                    <HighlightTile title="Aarogyan" subtitle="Founder" />
                    <HighlightTile title="6+" subtitle="Years building for web" />
                    <HighlightTile title="300+" subtitle="Students mentored" />
                </div>
            </OneUiSection>
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

function InfoBadge({ title }: { title: string }) {
    return (
        <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-white/5 flex items-center gap-2 text-[11px] font-medium opacity-80">
            <CheckCircle2 size={14} className="text-[var(--accent-primary)]" />
            {title}
        </div>
    )
}

function CheckCircle2({ size, className }: { size?: number, className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
