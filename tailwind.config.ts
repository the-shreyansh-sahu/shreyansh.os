import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                surface: {
                    base: "var(--surface-base)",
                    elevated: "var(--surface-elevated)",
                    overlay: "var(--surface-overlay)",
                    glass: "var(--surface-glass)",
                },
                accent: {
                    primary: "var(--accent-primary)",
                    green: "var(--accent-green)",
                    amber: "var(--accent-amber)",
                    red: "var(--accent-red)",
                    purple: "var(--accent-purple)",
                    win11: "var(--accent-win11-blue)",
                },
                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                    tertiary: "var(--text-tertiary)",
                }
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                xxl: "var(--radius-xxl)",
            },
        },
    },
    plugins: [],
};
export default config;
