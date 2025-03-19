import { useDrag, useDrop } from 'react-dnd';
import { Cancel01Icon } from 'hugeicons-react';
import Button from '~/components/Button';
import { useRef } from 'react';

const TaskItem = ({ task, index, moveTask, moveTaskBetweenColumns, openModal, confirmDeleteTask, status }) => {
    const ref = useRef(null);
    //hiệu ứng kéo
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task._id, index, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    //nhận phần tử được kéo vào
    const [, drop] = useDrop({
        accept: 'TASK',
        //kéo cùng cột( cùng status)
        hover: (draggedItem) => {
            if (draggedItem.status === status && draggedItem.index !== index) {
                moveTask(draggedItem.index, index, status);
                draggedItem.index = index;
            }
        },
        //kéo khác cột( khác status)
        drop: (draggedItem) => {
            if (draggedItem.status !== status) {
                moveTaskBetweenColumns(draggedItem.id, draggedItem.status, status);
                draggedItem.status = status;
            }
        },
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={`bg-gray-700 text-white p-2 rounded-md flex items-center justify-between cursor-move ${
                isDragging ? 'opacity-50' : ''
            }`}
        >
            <span className="w-full truncate cursor-pointer" onClick={() => openModal(task)} title={task.title}>
                {task.title}
            </span>
            <Button onClick={() => confirmDeleteTask(task)} icon={<Cancel01Icon size={14} color="#ea0e29" />} />
        </div>
    );
};

export default TaskItem;
