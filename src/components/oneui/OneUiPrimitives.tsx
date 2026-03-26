'use client'

import { cn } from '../../lib/cn'

export function OneUiSection({
    title,
    eyebrow,
    children,
    className,
}: {
    title: string
    eyebrow?: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <section className={cn('space-y-3', className)}>
            <div className="px-1">
                {eyebrow ? <div className="oneui-eyebrow">{eyebrow}</div> : null}
                <h2 className="oneui-section-title">{title}</h2>
            </div>
            {children}
        </section>
    )
}

export function OneUiCard({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return <div className={cn('oneui-card', className)}>{children}</div>
}

export function OneUiRow({
    title,
    subtitle,
    end,
    onClick,
    className,
}: {
    title: string
    subtitle?: string
    end?: React.ReactNode
    onClick?: () => void
    className?: string
}) {
    const Component = onClick ? 'button' : 'div'

    return (
        <Component
            onClick={onClick}
            className={cn(
                'oneui-row w-full text-left',
                onClick ? 'active:scale-[0.995]' : '',
                className
            )}
        >
            <div className="min-w-0">
                <div className="oneui-row-title">{title}</div>
                {subtitle ? <div className="oneui-row-subtitle">{subtitle}</div> : null}
            </div>
            {end ? <div className="shrink-0">{end}</div> : null}
        </Component>
    )
}

export function OneUiBadge({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return <span className={cn('oneui-badge', className)}>{children}</span>
}

export function OneUiMetric({
    label,
    value,
    tone,
}: {
    label: string
    value: string
    tone?: 'blue' | 'green' | 'amber'
}) {
    return (
        <div className={cn('oneui-metric', tone ? `oneui-metric-${tone}` : '')}>
            <div className="oneui-metric-label">{label}</div>
            <div className="oneui-metric-value">{value}</div>
        </div>
    )
}

export function OneUiPrimaryButton({
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={cn('oneui-button oneui-button-primary', className)}>
            {children}
        </button>
    )
}

export function OneUiSecondaryButton({
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={cn('oneui-button oneui-button-secondary', className)}>
            {children}
        </button>
    )
}

export function OneUiInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={cn('oneui-input', props.className)} />
}

export function OneUiTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return <textarea {...props} className={cn('oneui-input min-h-28 resize-none', props.className)} />
}
