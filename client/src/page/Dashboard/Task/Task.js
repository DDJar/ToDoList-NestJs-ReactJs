import { Cancel01Icon, NoteAddIcon } from 'hugeicons-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { _getTask } from '~/api/task';
import { _getUsers } from '~/api/user';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import SelectGroup from '~/components/Selected';
import axios from '~/config/configAxios';

const Task = () => {
    const [tasks, setTasks] = useState({
        Todo: [],
        Doing: [],
        Done: [],
    });
    const [users, setUsers] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskData, setTaskData] = useState({ title: '', description: '', status: 'Todo' });
    const [selectedStatus, setSelectedStatus] = useState('Todo');
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedOptionUser, setSelectedOptionUser] = useState('');

    const statusOptions = [
        { value: 'Todo', title: 'Todo' },
        { value: 'Doing', title: 'Doing' },
        { value: 'Done', title: 'Done' },
    ];

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios({
                    method: _getTask.method,
                    url: _getTask.url,
                    withCredentials: true,
                });
                console.log(res);

                if (res.data.status === 200) {
                    const groupedTasks = {
                        Todo: res.data.data.task.filter((task) => task.status === 'Todo'),
                        Doing: res.data.data.task.filter((task) => task.status === 'Doing'),
                        Done: res.data.data.task.filter((task) => task.status === 'Done'),
                    };
                    setTasks(groupedTasks);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);
    useEffect(() => {
        if (users) {
            let _userSelect = users.map((user) => ({
                value: user._id,
                title: `${user.full_name}`,
            }));
            setSelectedUser(_userSelect);
        }
    }, [users]);
    useEffect(() => {
        fetchData();
    }, [location.pathname]);
    const fetchData = async () => {
        try {
            const res = await axios({
                method: _getUsers.method,
                url: _getUsers.url,
                withCredentials: true,
            });
            if (res.data.status === 200) {
                setUsers(res.data.data.users);
            }
        } catch (error) {
            toast.error(`Hiển thị thất bại`, {
                render: `${error.message}`,
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
            });
        }
    };
    const toggleCreateModal = () => {
        setShowCreateModal(!showCreateModal);
        setTaskData({ title: '', description: '', status: 'Todo' });
        setSelectedStatus('Todo');
    };

    const handleInputChange = (key, value) => {
        setTaskData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSaveTask = async () => {
        try {
            const newTask = {
                ...taskData,
                assignee: selectedOptionUser || '',
                status: selectedStatus,
            };
            console.log(newTask);

            // const res = await axios.post('https://your-api-url.com/tasks', newTask);

            // setTasks((prev) => ({
            //     ...prev,
            //     [newTask.status]: [...prev[newTask.status], res.data],
            // }));

            toggleCreateModal();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const openModal = (task) => {
        setSelectedTask(task);
        setTaskData({
            title: task.title,
            description: task.description,
            status: task.status,
        });
        setSelectedUser(users.find((u) => u.value === task.assignee) || null);
        setSelectedStatus(task.status);
        setShowCreateModal(true);
    };

    const confirmDeleteTask = (task) => {
        setSelectedTask(task);
        setShowDeleteModal(true);
    };

    const handleDeleteTask = async () => {
        try {
            await axios.delete(`https://your-api-url.com/tasks/${selectedTask._id}`);

            setTasks((prev) => ({
                ...prev,
                [selectedTask.status]: prev[selectedTask.status].filter((t) => t._id !== selectedTask._id),
            }));

            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="min-h-screen p-8 flex justify-center items-start bg-gray-100">
            <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
                {Object.keys(tasks).map((column) => (
                    <div key={column} className="bg-gray-900 p-4 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-white text-lg font-semibold">{column}</h2>
                            <Button
                                secondary
                                onClick={toggleCreateModal}
                                className="mt-0"
                                icon={<NoteAddIcon size={12} color="#ffffff" variant="stroke" />}
                            />
                        </div>

                        <div className="mt-3 space-y-2">
                            {tasks[column].map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-gray-700 text-white p-2 rounded-md flex justify-between"
                                >
                                    <span onClick={() => openModal(task)}>{task.title}</span>
                                    <Button
                                        onClick={() => confirmDeleteTask(task)}
                                        icon={<Cancel01Icon size={12} color="#ea0e29" variant="stroke" />}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title={selectedTask ? 'Edit Task' : 'Add Task'}
                _showModal={showCreateModal}
                onClick={toggleCreateModal}
                onClickAccept={handleSaveTask}
            >
                <div className="grid gap-3">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border rounded"
                        value={taskData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                        value={taskData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <SelectGroup
                        data={selectedUser}
                        selectedOption={selectedOptionUser}
                        setSelectedOption={setSelectedOptionUser}
                    />
                    <SelectGroup
                        data={statusOptions}
                        selectedOption={selectedStatus}
                        setSelectedOption={setSelectedStatus}
                    />
                </div>
            </Modal>

            <Modal
                title="Confirm Delete Task"
                _showModal={showDeleteModal}
                onClick={toggleCreateModal}
                onClickAccept={handleDeleteTask}
            >
                {selectedTask && <p>Are you sure you want to delete the task {selectedTask.title}?</p>}
            </Modal>
        </div>
    );
};

export default Task;
