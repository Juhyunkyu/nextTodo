import React from 'react';
import { Todo } from '../../types/todo';
import { useTodo } from '../../contexts/TodoContext';

interface TodoItemProps {
    todo: Todo;
}

const priorityColors = {
    high: 'text-red-600 dark:text-red-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    low: 'text-green-600 dark:text-green-400'
};

const priorityLabels = {
    high: '높음',
    medium: '중간',
    low: '낮음'
};

export default function TodoItem({ todo }: TodoItemProps) {
    const { toggleTodo, deleteTodo } = useTodo();

    const formatDate = (date: Date) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString();
    };

    return (
        <div className={`
            group p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm
            transition-all duration-200 hover:shadow-md
            cursor-grab active:cursor-grabbing
        `}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                    <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                        <h3 className={`text-lg font-medium ${todo.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                            {todo.title}
                        </h3>
                        {todo.description && (
                            <p className={`mt-1 text-sm ${todo.isCompleted ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                {todo.description}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${priorityColors[todo.priority]}`}>
                            {priorityLabels[todo.priority]}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(todo.createdAt)}
                        </span>
                    </div>
                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
} 