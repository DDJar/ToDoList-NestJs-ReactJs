import React from 'react';

const TaskCard = ({ task, moveTask }) => {
    return (
        <div className="p-3 bg-gray-600 rounded-lg shadow-md">
            {task.title}
            <div className="mt-2 flex gap-2">
                {task.status !== 'todo' && (
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                        onClick={() => moveTask(task.id, 'todo')}
                    >
                        To Do
                    </button>
                )}
                {task.status !== 'doing' && (
                    <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                        onClick={() => moveTask(task.id, 'doing')}
                    >
                        Doing
                    </button>
                )}
                {task.status !== 'done' && (
                    <button
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                        onClick={() => moveTask(task.id, 'done')}
                    >
                        Done
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
