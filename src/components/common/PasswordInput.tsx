import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';
interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, error, className, ...props }, ref) => {
        const [isShow, setIsShow] = useState(false);
        const toggleIsShow = () => {
            setIsShow(!isShow);
        };
        return (
            <div className="relative w-full">
                <input
                    type={isShow ? 'text' : 'password'}
                    ref={ref}
                    {...props}
                    className={cn(
                        `peer block w-full appearance-none bg-card border-2 border-gray-300 px-3 py-2 rounded-md text-gray-900 focus:border-info-500 focus:outline-none focus:ring-1 focus:ring-info-500 ${className}`,
                        {
                            'ring-2 ring-error-500 blur:border-none focus:border-error-500 focus:outline-none focus:ring-1 focus:ring-error-500':
                                error,
                        }
                    )}
                    placeholder=" " // Placeholder trống để kích hoạt peer-placeholder-shown
                />

                <label
                    className={cn(
                        `absolute left-3 text-gray-500 bg-card px-1 transition-all duration-200 ease-in-out 
                        peer-placeholder-shown:text-base peer-focus:text-sm
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:pointer-events-none peer-focus:top-0 peer-focus:translate-y-[-50%] peer-focus:text-info-500
                        peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-y-[-50%] peer-not-placeholder-shown:text-info-500
                        top-0 translate-y-[-50%] rounded-sm`,
                        {
                            'peer-focus:text-error-500 peer-not-placeholder-shown:text-error-500 text-error-500 ':
                                error,
                        }
                    )}
                >
                    {label}
                </label>
                <div
                    className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-400"
                    onClick={toggleIsShow}
                >
                    {isShow ? (
                        <EyeIcon className="text-gray-800" />
                    ) : (
                        <EyeSlashIcon />
                    )}
                </div>
            </div>
        );
    }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
