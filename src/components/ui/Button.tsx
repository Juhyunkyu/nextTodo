import React from 'react';

const variantStyles = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400 transition-all duration-200 ease-in-out',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof variantStyles;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyles = 'px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm font-medium transform hover:scale-[1.02] active:scale-[0.98]';

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 