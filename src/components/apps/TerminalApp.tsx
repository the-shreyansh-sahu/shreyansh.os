'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Cpu, ShieldEllipsis, TerminalSquare } from 'lucide-react'
import { useTerminalCommands } from '../../hooks/useTerminalCommands'
import { OneUiBadge, OneUiCard, OneUiSection } from '../oneui/OneUiPrimitives'

interface TerminalAppProps {
    isMobile?: boolean
}

export default function TerminalApp({ isMobile }: TerminalAppProps) {
    const { history, executeCommand } = useTerminalCommands()
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            executeCommand(input)
            setInput('')
        }
    }

    const focusInput = () => {
        inputRef.current?.focus()
    }

    if (isMobile) {
        return (
            <div className="space-y-5 px-5 pb-8 pt-5">
                <OneUiCard className="space-y-4 overflow-hidden">
                    <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(131,220,255,0.22),rgba(255,255,255,0.08))] p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="oneui-eyebrow">Developer options</div>
                                <div className="text-[1.9rem] font-semibold tracking-[-0.06em] text-[var(--oneui-text)]">Developer options</div>
                            </div>
                            <OneUiBadge>Enabled</OneUiBadge>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <OptionTile icon={Cpu} label="Platform" value="Dual OS" />
                            <OptionTile icon={ShieldEllipsis} label="Commands" value="Live" />
                        </div>
                    </div>
                </OneUiCard>

                <OneUiSection title="Tools" eyebrow="Options">
                    <OneUiCard className="divide-y divide-[var(--oneui-border)] py-0">
                        <OptionRow title="USB debugging" subtitle="Portfolio shell command access" />
                        <OptionRow title="Developer console" subtitle="Interactive terminal session" />
                        <OptionRow title="Debug overlay" subtitle="Window, route, and shell inspection" />
                    </OneUiCard>
                </OneUiSection>

                <OneUiSection title="Console" eyebrow="Terminal">
                    <div className="overflow-hidden rounded-[2rem] border border-[var(--oneui-border)] bg-[#0f131a] text-[#9cebc1] shadow-[0_18px_36px_rgba(0,0,0,0.22)]">
                        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
                            <div className="flex items-center gap-2">
                                <TerminalSquare size={16} />
                                <span className="text-sm font-medium">shreyansh@oneui-shell</span>
                            </div>
                            <Cpu size={16} className="opacity-70" />
                        </div>
                        <div className="max-h-[420px] overflow-auto p-4 text-[12px]" onClick={focusInput}>
                            {history.map((line, i) => (
                                <div
                                    key={i}
                                    className={`min-w-full whitespace-pre-wrap ${line.type === 'error'
                                        ? 'text-[#ff8f8f]'
                                        : line.type === 'input'
                                            ? 'text-white'
                                            : line.type === 'system'
                                                ? 'text-[#95a0b3]'
                                                : ''
                                        }`}
                                >
                                    {line.content}
                                </div>
                            ))}
                            <div ref={bottomRef} />
                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-[#7db4ff]">{'>'}</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent text-white outline-none"
                                    autoFocus
                                    spellCheck={false}
                                />
                            </div>
                        </div>
                    </div>
                </OneUiSection>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full font-mono text-xs sm:text-sm md:text-base overflow-hidden" onClick={focusInput} style={{ backgroundColor: 'var(--surface-base)', color: 'var(--accent-green)' }}>
            <div className="flex-1 overflow-auto p-4 space-y-1 custom-scrollbar">
                {history.map((line, i) => (
                    <div
                        key={i}
                        className={`w-max min-w-full whitespace-pre ${
                            line.type === 'error' ? 'text-red-500' :
                                line.type === 'input' ? 'text-[var(--text-primary)]' :
                                    line.type === 'system' ? 'text-[var(--text-secondary)] opacity-70' : ''
                        }`}
                    >
                        {line.content}
                    </div>
                ))}
                <div ref={bottomRef} />
                <div className="flex items-center gap-2 pt-1">
                    <span className="text-[var(--accent-primary)]">{'>'}</span>
                    <span className="text-[var(--text-secondary)]">~</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] p-0 m-0 w-full"
                        autoFocus
                        spellCheck={false}
                    />
                </div>
            </div>
        </div>
    )
}

function OptionTile({ icon: Icon, label, value }: { icon: typeof Cpu; label: string; value: string }) {
    return (
        <div className="rounded-[1.4rem] bg-[var(--oneui-surface)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--oneui-accent-soft)] text-[var(--oneui-accent)]">
                <Icon size={18} />
            </div>
            <div className="text-sm font-semibold text-[var(--oneui-text)]">{label}</div>
            <div className="mt-1 text-xs text-[var(--oneui-text-soft)]">{value}</div>
        </div>
    )
}

function OptionRow({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="oneui-row">
            <div>
                <div className="oneui-row-title">{title}</div>
                <div className="oneui-row-subtitle">{subtitle}</div>
            </div>
            <ChevronRight size={16} className="text-[var(--oneui-text-faint)]" />
        </div>
    )
}
