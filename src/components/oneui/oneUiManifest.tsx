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
        label: 'Profile',
        title: 'Profile',
        subtitle: 'Contacts-style introduction and quick actions',
        accent: '#5cb4ff',
        tileBg: 'linear-gradient(180deg, #49b5ff 0%, #238dff 100%)',
        tileFg: '#ffffff',
        icon: '/oneui-icons/profile.svg',
        launcher: true,
        dock: true,
    },
    projects: {
        app: 'projects',
        label: 'Projects',
        title: 'Projects',
        subtitle: 'My Files and Gallery-inspired project browser',
        accent: '#6d8cff',
        tileBg: 'linear-gradient(180deg, #7b97ff 0%, #5a76f5 100%)',
        tileFg: '#ffffff',
        icon: '/oneui-icons/projects.svg',
        launcher: true,
        dock: true,
    },
    skills: {
        app: 'skills',
        label: 'Device Care',
        title: 'Device Care',
        subtitle: 'Skill health, capability summaries, and category drill-ins',
        accent: '#51d39a',
        tileBg: 'linear-gradient(180deg, #5dd7a5 0%, #15a76d 100%)',
        tileFg: '#ffffff',
        icon: '/oneui-icons/device-care.svg',
        launcher: true,
        dock: true,
    },
    experience: {
        app: 'experience',
        label: 'Timeline',
        title: 'Experience',
        subtitle: 'Career timeline and work history',
        accent: '#ffae57',
        tileBg: 'linear-gradient(180deg, #ffc36e 0%, #f39a37 100%)',
        tileFg: '#ffffff',
        icon: '/oneui-icons/notes.svg',
        launcher: false,
    },
    contact: {
        app: 'contact',
        label: 'Contact',
        title: 'Contact',
        subtitle: 'Reach out through direct actions or the message form',
        accent: '#7d92ff',
        tileBg: 'linear-gradient(180deg, #95a4ff 0%, #657cf6 100%)',
        tileFg: '#ffffff',
        icon: '/oneui-icons/contact.svg',
        launcher: true,
        dock: true,
    },
    resume: {
        app: 'resume',
        label: 'Notes',
        title: 'Notes',
        subtitle: 'Samsung Notes-style CV, highlights, and experience timeline',
        accent: '#f2c35d',
        tileBg: 'linear-gradient(180deg, #f7d36b 0%, #efb94b 100%)',
        tileFg: '#ffffff',
        icon: '/oneui-icons/notes.svg',
        launcher: true,
    },
    terminal: {
        app: 'terminal',
        label: 'Dev Mode',
        title: 'Developer Options',
        subtitle: 'Command console embedded into a One UI utility view',
        accent: '#8bd3ff',
        tileBg: 'linear-gradient(180deg, #7fd8ff 0%, #39aef3 100%)',
        tileFg: '#ffffff',
        icon: '/oneui-icons/dev-mode.svg',
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
        icon: '/oneui-icons/projects.svg',
        launcher: false,
    },
}

export const ONE_UI_LAUNCHER_APPS = Object.values(ONE_UI_MANIFEST).filter((item) => item.launcher)
export const ONE_UI_DOCK_APPS = ONE_UI_LAUNCHER_APPS.filter((item) => item.dock)
