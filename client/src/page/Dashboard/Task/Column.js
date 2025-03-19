import { useDrop } from 'react-dnd';
import TaskItem from './TaskItem';
import { NoteAddIcon } from 'hugeicons-react';
import Button from '~/components/Button';

const Column = ({
    status,
    tasks,
    setTasks,
    toggleCreateModal,
    openModal,
    confirmDeleteTask,
    moveTaskBetweenColumns,
}) => {
    //Xử lý khi một task được thả vào cột khác (useDrop phát hiện task đã đổi cột gọi moveTaskBetweenColumns)
    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (draggedItem) => {
            if (draggedItem.status !== status) {
                moveTaskBetweenColumns(draggedItem.id, draggedItem.status, status);
                draggedItem.status = status;
            }
        },
    });
    //sắp xếp các task trong cột
    const moveTask = (fromIndex, toIndex, columnStatus) => {
        const updatedTasks = [...tasks[columnStatus]];
        const [movedTask] = updatedTasks.splice(fromIndex, 1);
        updatedTasks.splice(toIndex, 0, movedTask);

        setTasks((prev) => ({
            ...prev,
            [columnStatus]: updatedTasks,
        }));
    };

    return (
        <div ref={drop} className="bg-gray-900 p-4 rounded-lg shadow-lg min-h-[200px] max-h-[400px] overflow-y-auto">
            <div className="flex items-center border-b-2 pb-2 border-white-100 justify-between w-full">
                <h2 className="text-white mb-0 text-lg font-semibold">{status}</h2>
                <Button
                    secondary
                    onClick={() => toggleCreateModal(status)}
                    className="mt-0"
                    icon={<NoteAddIcon size={12} color="#ffffff" variant="stroke" />}
                />
            </div>
            <div className="mt-3 space-y-2">
                {tasks[status].map((task, index) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        index={index}
                        moveTask={moveTask}
                        moveTaskBetweenColumns={moveTaskBetweenColumns}
                        openModal={openModal}
                        confirmDeleteTask={confirmDeleteTask}
                        status={status}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;
