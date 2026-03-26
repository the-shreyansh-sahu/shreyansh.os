'use client'

import Image from 'next/image'
import { Github, Linkedin, Mail, MessageCircle, Phone, Share2, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { OneUiBadge, OneUiCard, OneUiPrimaryButton, OneUiSection, OneUiSecondaryButton } from '../oneui/OneUiPrimitives'

interface AboutAppProps {
    isMobile?: boolean
}

export default function AboutApp({ isMobile }: AboutAppProps) {
    if (isMobile) {
        return <AboutMobileApp />
    }

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-center gap-8 md:items-start text-center md:text-left">
                <div className="relative w-32 h-32 flex-shrink-0 group">
                    <div className="absolute inset-0 rounded-2xl bg-[var(--accent-primary)] rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-20" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[var(--surface-glass-border)] shadow-xl">
                        <Image src="/shreyansh-sahu.jpg" alt="Profile" fill className="object-cover" />
                    </div>
                </div>

                <div className="space-y-3 flex-1">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--accent-primary)]">Shreyansh Sahu</h1>
                    <p className="text-lg font-medium opacity-90">Tech Entrepreneur & Student Ambassador</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <SocialButton icon={Github} href="https://github.com/shreyansh-os" />
                        <SocialButton icon={Linkedin} href="https://linkedin.com/in/shreyanshsahu" />
                        <SocialButton icon={Twitter} href="https://twitter.com/shreyansh_sahu" />
                        <SocialButton icon={Mail} href="mailto:shreyansh@example.com" />
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                <div className="glass-surface p-6 rounded-2xl border border-white/5 space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-2 h-6 bg-[var(--accent-primary)] rounded-full" />
                        About Me
                    </h2>
                    <p className="leading-relaxed opacity-80">
                        I am a young entrepreneur and tech enthusiast driven by the intersection of healthcare and technology.
                        As the Co-founder and Chairperson of the Aarogyan Foundation, I lead strategic initiatives to bridge healthcare gaps
                        across urban and rural India.
                    </p>
                    <p className="leading-relaxed opacity-80">
                        My journey also involves acting as an IBM Student Ambassador, where I empower students globally
                        through the SkillsBuild program. I&apos;m passionate about building digital experiences that matter,
                        from developing high-end interactive portfolios to managing large-scale NGO operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <QuickFact title="Location" value="Gurugram, India" />
                    <QuickFact title="Role" value="Fullstack Dev / Leader" />
                    <QuickFact title="Interests" value="AI, Frontend, Healthcare" />
                    <QuickFact title="Coffee" value="Cold Brew" />
                </div>
            </div>
        </div>
    )
}

function AboutMobileApp() {
    return (
        <div className="space-y-5 px-5 pb-8 pt-5">
            <OneUiCard className="space-y-5 overflow-hidden">
                <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(89,152,255,0.18),rgba(255,255,255,0.08))] p-5">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white/55 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                            <Image src="/shreyansh-sahu.jpg" alt="Profile" fill className="object-cover" />
                        </div>
                        <div className="min-w-0 pt-4">
                            <div className="text-2xl font-semibold tracking-[-0.05em] text-[var(--oneui-text)]">Shreyansh Sahu</div>
                            <div className="mt-1 text-sm text-[var(--oneui-text-soft)]">Founder, builder, student ambassador</div>
                            <div className="mt-3 flex flex-wrap justify-center gap-2">
                                <OneUiBadge>Gurugram</OneUiBadge>
                                <OneUiBadge>Healthcare + Tech</OneUiBadge>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                        <ContactQuickAction icon={Phone} label="Call" onClick={() => window.open('tel:+919318321133', '_self')} />
                        <ContactQuickAction icon={MessageCircle} label="Text" onClick={() => window.open('mailto:mail@shreyanshsahu.com', '_blank')} />
                        <ContactQuickAction icon={Share2} label="Share" onClick={() => window.open('https://shreyanshsahu.com', '_blank')} />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <OneUiPrimaryButton onClick={() => window.open('mailto:mail@shreyanshsahu.com', '_blank')}>Message</OneUiPrimaryButton>
                    <OneUiSecondaryButton onClick={() => window.open('tel:+919318321133', '_self')}>Call</OneUiSecondaryButton>
                    <OneUiSecondaryButton onClick={() => window.open('https://linkedin.com/in/shreyanshsahu', '_blank')}>Profile</OneUiSecondaryButton>
                </div>
            </OneUiCard>

            <OneUiSection title="Contact info" eyebrow="Contacts">
                <OneUiCard className="divide-y divide-[var(--oneui-border)] py-0">
                    <ContactRow title="Mobile" value="+91 93183 21133" />
                    <ContactRow title="Email" value="mail@shreyanshsahu.com" />
                    <ContactRow title="Website" value="shreyanshsahu.com" />
                    <ContactRow title="Location" value="Gurugram, India" />
                </OneUiCard>
            </OneUiSection>

            <OneUiSection title="Profile" eyebrow="Details">
                <OneUiCard className="divide-y divide-[var(--oneui-border)] py-0">
                    <ContactRow title="Company" value="Aarogyan Foundation" />
                    <ContactRow title="Role" value="Chairperson & Co-founder" />
                    <ContactRow title="Programs" value="IBM SkillsBuild, mentorship, digital products" />
                    <ContactRow title="Focus" value="Healthcare, software, community impact" />
                </OneUiCard>
            </OneUiSection>

            <OneUiSection title="Linked accounts" eyebrow="Social">
                <OneUiCard className="divide-y divide-[var(--oneui-border)] py-0">
                    <SocialRow icon={Github} label="GitHub" href="https://github.com/shreyansh-os" />
                    <SocialRow icon={Linkedin} label="LinkedIn" href="https://linkedin.com/in/shreyanshsahu" />
                    <SocialRow icon={Twitter} label="Twitter" href="https://twitter.com/shreyansh_sahu" />
                    <SocialRow icon={Mail} label="Email" href="mailto:mail@shreyanshsahu.com" />
                </OneUiCard>
            </OneUiSection>

            <OneUiSection title="Notes" eyebrow="Highlights">
                <OneUiCard className="space-y-3">
                    <ContactRow title="About" value="Young entrepreneur building at the intersection of healthcare and technology." />
                    <ContactRow title="Mentorship" value="Guided 300+ students on profiles, technology, and design careers." />
                    <ContactRow title="Creative work" value="Founder, actor, and director at KinderLand Productions." />
                </OneUiCard>
            </OneUiSection>
        </div>
    )
}

function ContactQuickAction({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="rounded-[1.4rem] bg-[var(--oneui-surface)] px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
        >
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--oneui-accent-soft)] text-[var(--oneui-accent)]">
                <Icon size={18} />
            </div>
            <div className="text-xs font-medium text-[var(--oneui-text)]">{label}</div>
        </button>
    )
}

function SocialButton({ icon: Icon, href }: { icon: LucideIcon, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-white/5 hover:border-[var(--accent-primary)]/30 hover:text-[var(--accent-primary)] transition-all duration-300"
        >
            <Icon size={20} />
        </a>
    )
}

function QuickFact({ title, value }: { title: string, value: string }) {
    return (
        <div className="glass-surface p-4 rounded-xl border border-white/5 flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-50">{title}</span>
            <span className="text-sm font-medium">{value}</span>
        </div>
    )
}

function SocialRow({ icon: Icon, label, href }: { icon: LucideIcon, label: string, href: string }) {
    return (
        <button
            onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
            className="oneui-row w-full text-left"
        >
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--oneui-surface-2)] text-[var(--oneui-text)]">
                    <Icon size={18} />
                </span>
                <span className="oneui-row-title">{label}</span>
            </div>
            <span className="text-sm text-[var(--oneui-text-soft)]">Open</span>
        </button>
    )
}

function ContactRow({ title, value }: { title: string, value: string }) {
    return (
        <div className="oneui-row">
            <div className="oneui-row-title">{title}</div>
            <div className="text-sm text-[var(--oneui-text-soft)] text-right">{value}</div>
        </div>
    )
}
