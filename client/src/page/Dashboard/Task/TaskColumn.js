import React from 'react';
import TaskCard from './TaskCard';

const COLUMN_TITLES = {
    todo: 'To Do',
    doing: 'Doing',
    done: 'Done',
};

const TaskColumn = ({ status, tasks, moveTask }) => {
    return (
        <div className="flex-1 p-4 bg-gray-800 rounded-lg overflow-auto min-h-0">
            <h3 className="text-lg font-bold mb-4">{COLUMN_TITLES[status]}</h3>
            <div className="flex flex-col gap-2">
                {tasks.length > 0 ? (
                    tasks.map((task) => <TaskCard key={task.id} task={task} moveTask={moveTask} />)
                ) : (
                    <p className="text-gray-400 text-sm">+ Add a card</p>
                )}
            </div>
        </div>
    );
};

export default TaskColumn;
