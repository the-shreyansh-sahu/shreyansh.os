export interface Skill {
    name: string
    level: number
    category: 'technical' | 'leadership' | 'performing' | 'interpersonal' | 'language'
}

export const skills: Skill[] = [
    { name: 'Full-Stack Web Development', level: 94, category: 'technical' },
    { name: 'Next.js', level: 92, category: 'technical' },
    { name: 'Tailwind CSS', level: 90, category: 'technical' },
    { name: 'TypeScript', level: 86, category: 'technical' },
    { name: 'Cross-Platform Development', level: 82, category: 'technical' },
    { name: 'Web App Development', level: 91, category: 'technical' },
    { name: 'SaaS', level: 80, category: 'technical' },
    { name: '3D Animation', level: 72, category: 'technical' },
    { name: 'Video Editing', level: 90, category: 'technical' },

    { name: 'Business Strategy', level: 95, category: 'leadership' },
    { name: 'Business Planning', level: 82, category: 'leadership' },
    { name: 'Venture Development', level: 83, category: 'leadership' },
    { name: 'Stakeholder Management', level: 88, category: 'leadership' },
    { name: 'Team Leadership', level: 92, category: 'leadership' },
    { name: 'Team Management', level: 90, category: 'leadership' },
    { name: 'Fundraising', level: 72, category: 'leadership' },
    { name: 'Program Coordination', level: 89, category: 'leadership' },
    { name: 'Digital Branding', level: 91, category: 'leadership' },
    { name: 'Content Strategy', level: 90, category: 'leadership' },
    { name: 'Social Media Management', level: 88, category: 'leadership' },

    { name: 'Stage Management', level: 95, category: 'performing' },
    { name: 'Stage Lighting Design', level: 92, category: 'performing' },
    { name: 'Stage Direction', level: 94, category: 'performing' },
    { name: 'Script Writing', level: 85, category: 'performing' },
    { name: 'Acting', level: 96, category: 'performing' },
    { name: 'Character Development', level: 87, category: 'performing' },
    { name: 'Production Management', level: 89, category: 'performing' },
    { name: 'Audience Engagement', level: 88, category: 'performing' },

    { name: 'Public Speaking', level: 92, category: 'interpersonal' },
    { name: 'Communication', level: 94, category: 'interpersonal' },
    { name: 'Networking', level: 88, category: 'interpersonal' },
    { name: 'Public Relations', level: 85, category: 'interpersonal' },
    { name: 'Mentorship', level: 93, category: 'interpersonal' },
    { name: 'Collaboration', level: 95, category: 'interpersonal' },
    { name: 'Adaptability', level: 94, category: 'interpersonal' },
    { name: 'Problem Solving', level: 90, category: 'interpersonal' },
    { name: 'Conflict Resolution', level: 82, category: 'interpersonal' },
    { name: 'Negotiation', level: 80, category: 'interpersonal' },
    { name: 'Emotional Intelligence', level: 89, category: 'interpersonal' },
    { name: 'Cross-functional Collaboration', level: 90, category: 'interpersonal' },
    { name: 'Community Outreach', level: 87, category: 'interpersonal' },

    { name: 'English', level: 100, category: 'language' },
    { name: 'Hindi', level: 100, category: 'language' },
    { name: 'Oriya', level: 100, category: 'language' },
]
