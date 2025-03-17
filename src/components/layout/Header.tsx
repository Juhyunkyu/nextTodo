import React, { useState } from 'react';
import AddTodoModal from '../todo/AddTodoModal';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Todo List
                    </h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                        >
                            <span>할일 추가</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
            <AddTodoModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </header>
    );
} 