import React, { useState } from 'react';
import TaskColumn from './TaskColumn';

const initialTasks = [
    { id: 1, title: 'Project planning', status: 'todo' },
    { id: 2, title: 'Kickoff meeting', status: 'todo' },
];

const Task = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const moveTask = (taskId, newStatus) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
    };

    return (
        <div className="flex gap-4 p-6 bg-white-900 min-h-auto text-white">
            {['todo', 'doing', 'done'].map((status) => (
                <TaskColumn
                    key={status}
                    status={status}
                    tasks={tasks.filter((task) => task.status === status)}
                    moveTask={moveTask}
                />
            ))}
        </div>
    );
};

export default Task;
