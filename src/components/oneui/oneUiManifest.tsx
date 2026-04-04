import type { LucideIcon } from 'lucide-react'
import { AppType } from '../../types/window'

export interface OneUiManifestItem {
    app: AppType
    label: string
    title: string
    subtitle: string
    accent: string
    tileBg: string
    tileFg: string
    icon: string | LucideIcon
    launcher: boolean
    dock?: boolean
}

export const ONE_UI_MANIFEST: Record<AppType, OneUiManifestItem> = {
    about: {
        app: 'about',
        label: 'Contacts',
        title: 'Contacts',
        subtitle: 'Profile card, identity summary, and quick contact actions',
        accent: '#5cb4ff',
        tileBg: 'linear-gradient(180deg, #74c6ff 0%, #3294ff 100%)',
        tileFg: '#ffffff',
        icon: '/samsung contacts.png',
        launcher: true,
        dock: true,
    },
    projects: {
        app: 'projects',
        label: 'My Files',
        title: 'My Files',
        subtitle: 'Portfolio projects organized like Samsung internal storage',
        accent: '#6d8cff',
        tileBg: 'linear-gradient(180deg, #8ca6ff 0%, #657df7 100%)',
        tileFg: '#ffffff',
        icon: '/samsung my files.png',
        launcher: true,
        dock: true,
    },
    skills: {
        app: 'skills',
        label: 'Device Care',
        title: 'Device Care',
        subtitle: 'Capability health, categories, and performance summaries',
        accent: '#51d39a',
        tileBg: 'linear-gradient(180deg, #6be0b1 0%, #20ad73 100%)',
        tileFg: '#ffffff',
        icon: '/samsung device care.png',
        launcher: true,
        dock: true,
    },
    experience: {
        app: 'experience',
        label: 'Calendar',
        title: 'Calendar',
        subtitle: 'Career timeline and milestones in a Samsung planner frame',
        accent: '#ffae57',
        tileBg: 'linear-gradient(180deg, #ffca74 0%, #f39b3d 100%)',
        tileFg: '#ffffff',
        icon: '/oneui-icons/notes.svg',
        launcher: false,
    },
    contact: {
        app: 'contact',
        label: 'Phone',
        title: 'Phone',
        subtitle: 'Reach out with call, mail, and message-style actions',
        accent: '#7d92ff',
        tileBg: 'linear-gradient(180deg, #98a7ff 0%, #6c81f7 100%)',
        tileFg: '#ffffff',
        icon: '/samsung phone.png',
        launcher: true,
        dock: true,
    },
    resume: {
        app: 'resume',
        label: 'Notes',
        title: 'Notes',
        subtitle: 'Resume, highlights, and background in Samsung Notes style',
        accent: '#f2c35d',
        tileBg: 'linear-gradient(180deg, #f7d977 0%, #efbc51 100%)',
        tileFg: '#ffffff',
        icon: '/samsung notes.png',
        launcher: true,
    },
    terminal: {
        app: 'terminal',
        label: 'Dev options',
        title: 'Developer options',
        subtitle: 'Terminal and controls framed like a Samsung utility screen',
        accent: '#8bd3ff',
        tileBg: 'linear-gradient(180deg, #92ddff 0%, #41b4f5 100%)',
        tileFg: '#ffffff',
        icon: '/terminal.png',
        launcher: true,
    },
    'project-detail': {
        app: 'project-detail',
        label: 'Project',
        title: 'Project',
        subtitle: 'Project detail route',
        accent: '#6d8cff',
        tileBg: 'linear-gradient(180deg, #7b97ff 0%, #5a76f5 100%)',
        tileFg: '#ffffff',
        icon: '/samsung my files.png',
        launcher: false,
    },
}

export const ONE_UI_LAUNCHER_APPS = Object.values(ONE_UI_MANIFEST).filter((item) => item.launcher)
export const ONE_UI_DOCK_APPS = ONE_UI_LAUNCHER_APPS.filter((item) => item.dock)
