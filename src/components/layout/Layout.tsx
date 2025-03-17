import React from 'react';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            <Header />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
} 