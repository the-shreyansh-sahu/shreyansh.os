import type { Metadata } from "next";
import { sans, mono } from "../styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
    title: 'Shreyansh Sahu — Full-Stack Developer & Founder',
    description: 'Portfolio of Shreyansh Sahu — full-stack developer, Founder of Aarogyan Foundation, IBM Student Ambassador, and Tech Lead. 6+ years building production web apps. Gurugram, India. Open to freelance.',
    keywords: ['Full-stack developer', 'Next.js', 'React', 'Freelance', 'India', 'Gurugram', 'IBM Ambassador', 'Healthcare Tech'],
    authors: [{ name: 'Shreyansh Sahu', url: 'https://shreyanshsahu.com' }],
    openGraph: {
        title: 'SHREYANSH.OS — Portfolio',
        description: 'A portfolio that is two operating systems. Win11 on desktop, One UI on mobile.',
        url: 'https://shreyanshsahu.com',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SHREYANSH.OS',
        description: 'A portfolio that is also two operating systems.',
        images: ['/og-image.png'],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{
                    __html: `
          const t = localStorage.getItem('shreyansh_os_theme');
          const parsed = t ? JSON.parse(t) : null;
          const theme = parsed && parsed.state && parsed.state.theme ? parsed.state.theme : 'dark';
          document.documentElement.dataset.theme = theme;
        `}} />
            </head>
            <body
                className={`${sans.variable} ${mono.variable} antialiased overflow-hidden`}
            >
                {children}
            </body>
        </html>
    );
}
