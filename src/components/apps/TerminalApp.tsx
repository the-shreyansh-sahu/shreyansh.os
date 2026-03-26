'use client'

import { useEffect, useRef, useState } from 'react'
import { Cpu, TerminalSquare } from 'lucide-react'
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
                <OneUiCard className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="oneui-eyebrow">Developer options</div>
                            <div className="text-[1.8rem] font-semibold tracking-[-0.05em] text-[var(--oneui-text)]">Console</div>
                        </div>
                        <OneUiBadge>Interactive</OneUiBadge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="oneui-metric oneui-metric-blue">
                            <div className="oneui-metric-label">Platform</div>
                            <div className="oneui-metric-value">Dual OS</div>
                        </div>
                        <div className="oneui-metric oneui-metric-green">
                            <div className="oneui-metric-label">Commands</div>
                            <div className="oneui-metric-value">Live</div>
                        </div>
                    </div>
                </OneUiCard>

                <OneUiSection title="Terminal session" eyebrow="Dev mode">
                    <div className="overflow-hidden rounded-[2rem] border border-[var(--oneui-border)] bg-[#0f131a] text-[#9cebc1]">
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
        <div
            className="flex flex-col h-full font-mono text-xs sm:text-sm md:text-base overflow-hidden"
            onClick={focusInput}
            style={{
                backgroundColor: 'var(--surface-base)',
                color: 'var(--accent-green)',
            }}
        >
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
