'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { OneUiCard, OneUiInput, OneUiPrimaryButton, OneUiSection, OneUiTextarea } from '../oneui/OneUiPrimitives'

interface ContactAppProps {
    isMobile?: boolean
}

export default function ContactApp({ isMobile }: ContactAppProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')

        setTimeout(() => {
            setStatus('success')
        }, 1500)
    }

    if (status === 'success') {
        return isMobile ? (
            <div className="px-5 pt-5">
                <OneUiCard className="space-y-4 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--oneui-success-soft)] text-[var(--oneui-success)]">
                        <CheckCircle2 size={34} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--oneui-text)]">Message sent</h2>
                        <p className="mt-2 text-sm text-[var(--oneui-text-soft)]">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                    </div>
                    <OneUiPrimaryButton onClick={() => setStatus('idle')}>Send another</OneUiPrimaryButton>
                </OneUiCard>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold">Message Sent!</h2>
                <p className="opacity-60 max-w-xs text-sm">Thanks for reaching out! I&apos;ll get back to you as soon as possible.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2 bg-[var(--surface-elevated)] hover:bg-[var(--surface-glass-border)] rounded-xl text-sm font-bold transition-all"
                >
                    Send Another
                </button>
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className="space-y-5 px-5 pb-8 pt-5">
                <OneUiCard className="space-y-4">
                    <div className="text-center">
                        <div className="text-[2rem] font-semibold tracking-[-0.06em] text-[var(--oneui-text)]">Shreyansh Sahu</div>
                        <div className="mt-1 text-sm text-[var(--oneui-text-soft)]">Contacts card</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-[1.4rem] bg-[var(--oneui-surface-2)] px-3 py-4 text-center">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--oneui-accent-soft)] text-[var(--oneui-accent)]"><Phone size={18} /></div>
                            <div className="text-xs font-medium text-[var(--oneui-text)]">Call</div>
                        </div>
                        <div className="rounded-[1.4rem] bg-[var(--oneui-surface-2)] px-3 py-4 text-center">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--oneui-accent-soft)] text-[var(--oneui-accent)]"><Mail size={18} /></div>
                            <div className="text-xs font-medium text-[var(--oneui-text)]">Text</div>
                        </div>
                        <div className="rounded-[1.4rem] bg-[var(--oneui-surface-2)] px-3 py-4 text-center">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--oneui-accent-soft)] text-[var(--oneui-accent)]"><Send size={18} /></div>
                            <div className="text-xs font-medium text-[var(--oneui-text)]">Email</div>
                        </div>
                    </div>
                </OneUiCard>

                <OneUiSection title="Contact info" eyebrow="Details">
                    <OneUiCard className="space-y-4">
                        <ContactAction icon={Phone} title="Call" value="+91 93183 21133" />
                        <ContactAction icon={Mail} title="Email" value="mail@shreyanshsahu.com" />
                        <ContactAction icon={MapPin} title="Location" value="Gurugram, India" />
                    </OneUiCard>
                </OneUiSection>

                <OneUiSection title="Send message" eyebrow="Compose">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <OneUiInput required type="text" placeholder="Full name" />
                        <OneUiInput required type="email" placeholder="Email address" />
                        <OneUiTextarea required placeholder="What do you want to build together?" rows={5} />
                        <OneUiPrimaryButton disabled={status === 'loading'} className="w-full">
                            {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            {status === 'loading' ? 'Sending...' : 'Send message'}
                        </OneUiPrimaryButton>
                    </form>
                </OneUiSection>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500 pb-24 max-w-lg mx-auto">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-[var(--accent-primary)]">Contact</h1>
                <p className="opacity-60 text-sm">Have a project in mind or just want to say hi? Drop me a line below.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold opacity-40 ml-1">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-5 py-3 rounded-2xl bg-[var(--surface-elevated)] border border-white/5 focus:border-[var(--accent-primary)]/50 focus:ring-1 focus:ring-[var(--accent-primary)]/50 outline-none transition-all placeholder:opacity-30" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold opacity-40 ml-1">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full px-5 py-3 rounded-2xl bg-[var(--surface-elevated)] border border-white/5 focus:border-[var(--accent-primary)]/50 focus:ring-1 focus:ring-[var(--accent-primary)]/50 outline-none transition-all placeholder:opacity-30" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold opacity-40 ml-1">Message</label>
                    <textarea required rows={4} placeholder="Your message goes here..." className="w-full px-5 py-3 rounded-2xl bg-[var(--surface-elevated)] border border-white/5 focus:border-[var(--accent-primary)]/50 focus:ring-1 focus:ring-[var(--accent-primary)]/50 outline-none transition-all placeholder:opacity-30 resize-none" />
                </div>
                <button disabled={status === 'loading'} className="w-full py-4 rounded-2xl bg-[var(--accent-primary)] text-black font-bold flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 disabled:brightness-100 transition-all shadow-lg active:scale-[0.98]">
                    {status === 'loading' ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            Send Message
                        </>
                    )}
                </button>
            </form>

            <div className="flex justify-center gap-8 pt-4 opacity-40">
                <div className="text-center">
                    <p className="text-[9px] uppercase font-bold mb-1 font-mono">Email</p>
                    <p className="text-xs">mail@shreyanshsahu.com</p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] uppercase font-bold mb-1 font-mono">Location</p>
                    <p className="text-xs">Gurugram, India</p>
                </div>
            </div>
        </div>
    )
}

function ContactAction({ icon: Icon, title, value }: { icon: typeof Phone, title: string, value: string }) {
    return (
        <div className="oneui-row">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--oneui-surface-2)] text-[var(--oneui-text)]">
                    <Icon size={18} />
                </span>
                <div>
                    <div className="oneui-row-title">{title}</div>
                    <div className="oneui-row-subtitle">{value}</div>
                </div>
            </div>
            <span className="text-sm font-semibold text-[var(--oneui-accent)]">Open</span>
        </div>
    )
}
