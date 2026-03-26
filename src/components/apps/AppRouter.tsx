'use client'

import React from 'react'
import { AppType } from '../../types/window'
import { Project } from '../../types/project'
import AboutApp from './AboutApp'
import ProjectsApp from './ProjectsApp'
import SkillsApp from './SkillsApp'
import TerminalApp from './TerminalApp'
import ContactApp from './ContactApp'
import ResumeApp from './ResumeApp'
import { ProjectDetail } from './ProjectDetail'

interface AppRouterProps {
    app: AppType
    isMobile?: boolean
    props?: Record<string, unknown>
}

export function AppRouter({ app, props, isMobile }: AppRouterProps) {
    switch (app) {
        case 'about':
            return <AboutApp isMobile={isMobile} />
        case 'projects':
            return <ProjectsApp isMobile={isMobile} />
        case 'skills':
            return <SkillsApp isMobile={isMobile} />
        case 'terminal':
            return <TerminalApp isMobile={isMobile} />
        case 'contact':
            return <ContactApp isMobile={isMobile} />
        case 'resume':
        case 'experience':
            return <ResumeApp isMobile={isMobile} initialTab={app} />
        case 'project-detail': {
            const project = props?.project as Project | undefined
            if (!project) {
                return (
                    <div className="p-8 flex items-center justify-center h-full opacity-50">
                        Project not found.
                    </div>
                )
            }

            return <ProjectDetail project={project} onBack={() => { }} isMobile={isMobile} />
        }
        default:
            return (
                <div className="p-8 flex items-center justify-center h-full opacity-50">
                    Component for &quot;{app}&quot; not yet implemented.
                </div>
            )
    }
}
