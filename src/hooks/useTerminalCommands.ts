import { useState, useCallback, ReactNode } from 'react'
import { TERMINAL_COMMANDS } from '../data/terminal-commands'
import { skills } from '../data/skills'
import { useWindowStore } from '../store/windowStore'
import { useOneUiStore } from '../store/oneUiStore'
import { useOSStore } from '../store/osStore'
import { AppType } from '../types/window'

interface TerminalLine {
    content: string | ReactNode
    type: 'input' | 'output' | 'error' | 'system'
}

const INITIAL_HISTORY: TerminalLine[] = [
    { content: 'SHREYANSH.OS Terminal [Version 4.0]', type: 'system' },
    { content: 'Type "help" to see available commands.', type: 'system' },
]

const DIRECTORY_TARGETS: Record<string, AppType> = {
    about: 'about',
    projects: 'projects',
    skills: 'skills',
    contact: 'contact',
    resume: 'resume',
    experience: 'experience',
    terminal: 'terminal',
}

const NEOFETCH_ART = [
    '   _____ __  ______  ___________  _______   ___   _   __________ __  ____   ',
    '  / ___// / / / __ \\/ ____/ __ \\ \\/ /   | / | / / / ___/  _/ / / /  |/  /   ',
    '  \\__ \\/ /_/ / /_/ / __/ / / / /\\  / /| |/  |/ /  \\__ \\ / // /_/ / /|_/ /    ',
    ' ___/ / __  / _, _/ /___/ /_/ / / / ___ / /|  /  ___/ // // __  / /  / /     ',
    '/____/_/ /_/_/ |_/_____/\\____/ /_/_/  |_/_/ |_/  /____/___/_/ /_/_/  /_/      ',
    '                                                                                ',
    '                                .OS                                             ',
    '                              .oooooo.                                          ',
    '                             d8P\'  `Y8b                                         ',
    '                            888      888                                        ',
    '                            888      888                                        ',
    '                            888      888                                        ',
    '                            `88b    d88\'                                        ',
    '                             `Y8bood8P\'                                         ',
]

const NEOFETCH_INFO = [
    'shreyansh@shreyansh-os',
    '---------------------',
    'OS: SHREYANSH.OS 4.0 Portfolio Edition',
    'Host: Creator Workstation',
    'Kernel: Next.js 15.1.0',
    'Uptime: 6+ years building on the web',
    'Shell: terminal.exe',
    'Resolution: Responsive',
    'DE: Win11 / One UI',
    'WM: Motion + Tailwind',
    'Terminal: Portfolio Console',
    'CPU: Human Brain Pro Max',
    'GPU: Imagination RTX',
    'Memory: 24 GB creative energy',
]

const NEOFETCH_LINES = Array.from({ length: Math.max(NEOFETCH_ART.length, NEOFETCH_INFO.length) }, (_, index) => {
    const art = NEOFETCH_ART[index] ?? ''
    const info = NEOFETCH_INFO[index] ?? ''

    return `${art.padEnd(88, ' ')}${info}`
})

const HIRE_ME_ART = [
    '  HIRE ME',
    '  -------',
    '  Opening contact form...',
]

function openAppForCurrentPlatform(app: AppType) {
    const platform = useOSStore.getState().platform

    if (platform === 'oneui') {
        useOneUiStore.getState().openApp(app)
        return
    }

    useWindowStore.getState().openWindow(app)
}

export function useTerminalCommands() {
    const [history, setHistory] = useState<TerminalLine[]>(INITIAL_HISTORY)

    const appendLines = useCallback((lines: TerminalLine[]) => {
        setHistory((prev) => [...prev, ...lines])
    }, [])

    const executeCommand = useCallback((cmd: string) => {
        const trimmed = cmd.trim()
        const fullCmd = trimmed.toLowerCase()

        if (!trimmed) {
            return
        }

        const parts = fullCmd.split(/\s+/)
        const [baseCmd, ...args] = parts

        setHistory((prev) => [...prev, { content: `> ${cmd}`, type: 'input' }])

        if (fullCmd === 'clear') {
            setHistory([])
            return
        }

        if (fullCmd === 'hire me') {
            openAppForCurrentPlatform('contact')
            appendLines([
                ...HIRE_ME_ART.map((line) => ({ content: line, type: 'output' as const })),
            ])
            return
        }

        switch (baseCmd) {
            case 'help': {
                appendLines([
                    { content: 'Available commands:', type: 'output' },
                    ...TERMINAL_COMMANDS.map((item) => ({
                        content: `${item.command.padEnd(16, ' ')} ${item.description}`,
                        type: 'output' as const,
                    })),
                ])
                return
            }

            case 'whoami': {
                appendLines([
                    { content: 'Shreyansh Sahu', type: 'output' },
                    { content: 'Chairperson, Aarogyan Foundation | IBM Student Ambassador | SaaS & Full-Stack Web Developer', type: 'output' },
                    { content: 'Gurugram, Haryana, India', type: 'output' },
                    { content: 'mail@shreyanshsahu.com | shreyanshsahu.com', type: 'output' },
                ])
                return
            }

            case 'ls': {
                appendLines([
                    { content: 'about/  projects/  skills/  experience/  contact/  resume.pdf', type: 'output' },
                ])
                return
            }

            case 'cd': {
                const section = args[0]
                if (!section) {
                    appendLines([{ content: 'cd: missing section. Usage: cd [section]', type: 'error' }])
                    return
                }

                const target = DIRECTORY_TARGETS[section]
                if (!target) {
                    appendLines([{ content: `cd: ${section}: No such section`, type: 'error' }])
                    return
                }

                openAppForCurrentPlatform(target)
                appendLines([{ content: `Opening ${target}...`, type: 'output' }])
                return
            }

            case 'skills': {
                if (args[0] !== '--list') {
                    appendLines([{ content: 'Usage: skills --list', type: 'error' }])
                    return
                }

                appendLines([
                    { content: 'Skill levels:', type: 'output' },
                    ...skills.map((skill) => ({
                        content: `${skill.name.padEnd(24, ' ')} ${String(skill.level).padStart(3, ' ')}%`,
                        type: 'output' as const,
                    })),
                ])
                return
            }

            case 'neofetch': {
                appendLines(NEOFETCH_LINES.map((line) => ({ content: line, type: 'output' as const })))
                return
            }

            default: {
                appendLines([
                    { content: `Command not found: ${fullCmd}. Type "help" for a list of commands.`, type: 'error' },
                ])
            }
        }
    }, [appendLines])

    return { history, executeCommand }
}
