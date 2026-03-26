export type ProjectStatus = 'LIVE' | 'WIP' | 'ACTIVE' | 'COMPLETED'

export interface Project {
    id: string
    title: string
    description: string
    longDescription?: string
    status: ProjectStatus
    tech: string[]
    link?: string
    github?: string
    thumbnail?: string
    date?: string
    year: string
    projectType: string
    image?: string
}
