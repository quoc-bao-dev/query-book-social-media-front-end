import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                primary: {
                    DEFAULT: 'var(--primary-500)',
                    foreground: 'var(--primary-foreground)',
                    '50': 'var(--primary-50)',
                    '100': 'var(--primary-100)',
                    '200': 'var(--primary-200)',
                    '300': 'var(--primary-300)',
                    '400': 'var(--primary-400)',
                    '500': 'var(--primary-500)',
                    '600': 'var(--primary-600)',
                    '700': 'var(--primary-700)',
                    '800': 'var(--primary-800)',
                    '900': 'var(--primary-900)',
                    '950': 'var(--primary-950)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary-500)',
                    '50': 'var(--secondary-50)',
                    '100': 'var(--secondary-100)',
                    '200': 'var(--secondary-200)',
                    '300': 'var(--secondary-300)',
                    '400': 'var(--secondary-400)',
                    '500': 'var(--secondary-500)',
                    '600': 'var(--secondary-600)',
                    '700': 'var(--secondary-700)',
                    '800': 'var(--secondary-800)',
                    '900': 'var(--secondary-900)',
                    '950': 'var(--secondary-950)',
                },

                neutral: {
                    DEFAULT: 'var(--neutral-500)',
                    '50': 'var(--neutral-50)',
                    '100': 'var(--neutral-100)',
                    '200': 'var(--neutral-200)',
                    '300': 'var(--neutral-300)',
                    '400': 'var(--neutral-400)',
                    '500': 'var(--neutral-500)',
                    '600': 'var(--neutral-600)',
                    '700': 'var(--neutral-700)',
                    '800': 'var(--neutral-800)',
                    '900': 'var(--neutral-900)',
                    '950': 'var(--neutral-950)',
                },
                info: {
                    DEFAULT: 'var(--info-500)',
                    '50': 'var(--info-50)',
                    '100': 'var(--info-100)',
                    '200': 'var(--info-200)',
                    '300': 'var(--info-300)',
                    '400': 'var(--info-400)',
                    '500': 'var(--info-500)',
                    '600': 'var(--info-600)',
                    '700': 'var(--info-700)',
                    '800': 'var(--info-800)',
                    '900': 'var(--info-900)',
                    '950': 'var(--info-950)',
                },
                success: {
                    DEFAULT: 'var(--success-500)',
                    '50': 'var(--success-50)',
                    '100': 'var(--success-100)',
                    '200': 'var(--success-200)',
                    '300': 'var(--success-300)',
                    '400': 'var(--success-400)',
                    '500': 'var(--success-500)',
                    '600': 'var(--success-600)',
                    '700': 'var(--success-700)',
                    '800': 'var(--success-800)',
                    '900': 'var(--success-900)',
                    '950': 'var(--success-950)',
                },
                warning: {
                    DEFAULT: 'var(--warning-500)',
                    '50': 'var(--warning-50)',
                    '100': 'var(--warning-100)',
                    '200': 'var(--warning-200)',
                    '300': 'var(--warning-300)',
                    '400': 'var(--warning-400)',
                    '500': 'var(--warning-500)',
                    '600': 'var(--warning-600)',
                    '700': 'var(--warning-700)',
                    '800': 'var(--warning-800)',
                    '900': 'var(--warning-900)',
                    '950': 'var(--warning-950)',
                },
                error: {
                    DEFAULT: 'var(--error-500)',
                    '50': 'var(--error-50)',
                    '100': 'var(--error-100)',
                    '200': 'var(--error-200)',
                    '300': 'var(--error-300)',
                    '400': 'var(--error-400)',
                    '500': 'var(--error-500)',
                    '600': 'var(--error-600)',
                    '700': 'var(--error-700)',
                    '800': 'var(--error-800)',
                    '900': 'var(--error-900)',
                    '950': 'var(--error-950)',
                },
                gray: {
                    DEFAULT: 'var(--gray-500)',
                    '50': 'var(--gray-50)',
                    '100': 'var(--gray-100)',
                    '200': 'var(--gray-200)',
                    '300': 'var(--gray-300)',
                    '400': 'var(--gray-400)',
                    '500': 'var(--gray-500)',
                    '600': 'var(--gray-600)',
                    '700': 'var(--gray-700)',
                    '800': 'var(--gray-800)',
                    '900': 'var(--gray-900)',
                    '950': 'var(--gray-950)',
                },

                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },

            boxShadow: {
                1: 'var(--shadow-sm)',
                2: 'var(--shadow-md)',
                3: 'var(--shadow-lg)',
                4: 'var(--shadow-xl)',
                5: 'var(--shadow-2xl)',
                inner: 'var(--shadow-inner)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
    corePlugins: {
        backgroundOpacity: true,
    },
} satisfies Config;
