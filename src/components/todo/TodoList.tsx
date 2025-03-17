import React from 'react';
import { DragDropContext, Draggable, DropResult, DroppableProvided } from '@hello-pangea/dnd';
import { useTodo } from '../../contexts/TodoContext';
import TodoItem from './TodoItem';
import StrictModeDroppable from './StrictModeDroppable';

const TodoList: React.FC = () => {
    // TodoContext에서 할일 목록과 순서 변경 함수 가져오기
    const { todos, reorderTodos } = useTodo();

    // 할일 목록을 order 기준으로 정렬
    const sortedTodos = [...todos].sort((a, b) => a.order - b.order);

    // 드래그 앤 드롭이 끝났을 때 실행되는 함수
    const handleDragEnd = (result: DropResult) => {
        // 드롭 위치가 없으면 종료
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        // 위치가 변경되지 않았으면 종료
        if (sourceIndex === destinationIndex) return;

        // 할일 순서 변경
        reorderTodos(sourceIndex, destinationIndex);
    };

    // 할일이 없을 때 보여줄 빈 상태 UI
    if (todos.length === 0) {
        return (
            <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-4 text-gray-600 dark:text-gray-400">할 일이 없습니다</p>
            </div>
        );
    }

    // 드래그 앤 드롭이 가능한 할일 목록 UI
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="space-y-2">
                {/* StrictMode에서 작동하는 Droppable 컴포넌트 */}
                <StrictModeDroppable droppableId="todos">
                    {(provided: DroppableProvided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {/* 정렬된 할일 목록을 매핑하여 표시 */}
                            {sortedTodos.map((todo, index) => (
                                <Draggable
                                    key={todo.id}
                                    draggableId={todo.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`mb-2 ${snapshot.isDragging ? 'z-50' : ''}`}
                                        >
                                            <TodoItem todo={todo} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {/* 드래그 중인 아이템의 공간을 유지하기 위한 플레이스홀더 */}
                            {provided.placeholder}
                        </div>
                    )}
                </StrictModeDroppable>
            </div>
        </DragDropContext>
    );
};

export default TodoList; 