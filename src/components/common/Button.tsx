'use client';

import { forwardRef, MouseEvent } from 'react';
import './Button.css';
import { cn } from '@/lib/utils';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    hoverEffect?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            loading = false,
            hoverEffect = false,
            ...props
        },
        ref
    ) => {
        const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
            const button = e.currentTarget;
            const ripple = document.createElement('span');

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.className = 'ripple';

            button.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'ripple-container inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90',
                    {
                        'bg-primary text-primary-foreground ':
                            variant === 'primary',
                        'bg-secondary text-secondary-foreground hover:bg-secondary/90':
                            variant === 'secondary',
                        'bg-transparent text-primary-foreground hover:bg-primary/10':
                            variant === 'ghost',
                        'text-neutral-900 hover:underline': variant === 'link',
                        'button-hover': hoverEffect,
                    },
                    {
                        'text-sm px-2 py-1': size === 'sm',
                        'text-base px-4 py-2': size === 'md',
                        'text-base px-6 py-3': size === 'lg',
                    },
                    {
                        'w-full': fullWidth,
                    },
                    className
                )}
                disabled={loading}
                onClick={handleClick}
                {...props}
            >
                {props.children}
                {loading && <span className="ripple"></span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
