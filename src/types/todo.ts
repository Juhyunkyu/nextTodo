export type TodoPriority = 'high' | 'medium' | 'low';

export interface Todo {
    id: string;
    title: string;
    description?: string;
    priority: TodoPriority;
    isCompleted: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
} 