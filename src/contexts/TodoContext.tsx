import React, { createContext, useContext, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Todo, TodoPriority } from '../types/todo';
import { v4 as uuidv4 } from 'uuid';

// Todo 관련 기능들의 타입 정의
interface TodoContextType {
    todos: Todo[];                // 할일 목록 배열
    addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;  // 할일 추가 함수
    updateTodo: (id: string, updatedTodo: Partial<Todo>) => void;  // 할일 수정 함수
    deleteTodo: (id: string) => void;  // 할일 삭제 함수
    toggleTodo: (id: string) => void;  // 할일 완료/미완료 토글 함수
    reorderTodos: (startIndex: number, endIndex: number) => void;  // 할일 순서 변경 함수
}

// Context 생성
const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
    // localStorage에서 할일 목록을 불러와 초기 상태로 설정
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    // todos가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // 새로운 할일 추가
    const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
        const newTodo: Todo = {
            ...todo,
            id: uuidv4(),  // 고유 ID 생성
            order: todos.length,  // 목록의 마지막에 추가
            createdAt: new Date(),  // 생성 시간 기록
            updatedAt: new Date(),  // 수정 시간 기록
        };
        setTodos(prev => [...prev, newTodo]);
    };

    // 할일 수정
    const updateTodo = (id: string, updatedTodo: Partial<Todo>) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id
                ? { ...todo, ...updatedTodo, updatedAt: new Date() }
                : todo
        ));
    };

    // 할일 삭제
    const deleteTodo = (id: string) => {
        setTodos(prev => {
            const filtered = prev.filter(todo => todo.id !== id);
            // 삭제 후 순서 재정렬
            return filtered.map((todo, index) => ({
                ...todo,
                order: index
            }));
        });
    };

    // 할일 완료/미완료 토글
    const toggleTodo = (id: string) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id
                ? { ...todo, isCompleted: !todo.isCompleted, updatedAt: new Date() }
                : todo
        ));
    };

    // 드래그 앤 드롭으로 할일 순서 변경
    const reorderTodos = (startIndex: number, endIndex: number) => {
        const newTodos = Array.from(todos);
        const [removed] = newTodos.splice(startIndex, 1);
        newTodos.splice(endIndex, 0, removed);

        // 순서 업데이트
        const reorderedTodos = newTodos.map((todo, index) => ({
            ...todo,
            order: index,
            updatedAt: new Date()
        }));

        setTodos(reorderedTodos);
    };

    // Context Provider를 통해 하위 컴포넌트에 기능 제공
    return (
        <TodoContext.Provider value={{
            todos,
            addTodo,
            updateTodo,
            deleteTodo,
            toggleTodo,
            reorderTodos
        }}>
            {children}
        </TodoContext.Provider>
    );
}

// Custom Hook: TodoContext 사용을 쉽게 만듦
export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
}; 