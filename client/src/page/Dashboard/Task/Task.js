import { Cancel01Icon, NoteAddIcon } from 'hugeicons-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { _createTasks, _deleteTasks, _getTask, _updateTasks } from '~/api/task';
import { _getAllUsers } from '~/api/user';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import SelectGroup from '~/components/Selected';
import axios from '~/config/configAxios';
import { validateInputRequire } from '~/utils/validate';

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
    const [taskData, setTaskData] = useState({ _id: '', title: '', description: '', status: '' });
    const [selectedStatus, setSelectedStatus] = useState('Todo');
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedOptionUser, setSelectedOptionUser] = useState('');

    const statusOptions = [
        { value: 'Todo', title: 'Todo' },
        { value: 'Doing', title: 'Doing' },
        { value: 'Done', title: 'Done' },
    ];
    const [errTaskData, setErrTaskData] = useState({
        title: '',
        description: '',
    });
    useEffect(() => {
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
    const fetchTasks = async () => {
        try {
            const res = await axios({
                method: _getTask.method,
                url: _getTask.url,
                withCredentials: true,
            });
            if (res.data.status === 200) {
                const groupedTasks = {
                    Todo: res.data.data.task.filter((task) => task.status === 'Todo'),
                    Doing: res.data.data.task.filter((task) => task.status === 'Doing'),
                    Done: res.data.data.task.filter((task) => task.status === 'Done'),
                };
                setTasks(groupedTasks);
            }
        } catch (error) {
            toast.error(`Display failed`, {
                render: `${error.message}`,
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
            });
        }
    };
    const fetchData = async () => {
        try {
            const res = await axios({
                method: _getAllUsers.method,
                url: _getAllUsers.url,
                withCredentials: true,
            });
            if (res.data.status === 200) {
                setUsers(res.data.data.users);
            }
        } catch (error) {
            toast.error(`Display failed`, {
                render: `${error.message}`,
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
            });
        }
    };
    const toggleCreateModal = (column) => {
        setShowCreateModal(!showCreateModal);
        if (!showCreateModal) {
            setTaskData({ title: '', description: '', status: column });
            setSelectedStatus(column);
            setSelectedOptionUser('');
            setSelectedTask(null);
        }
        setErrTaskData('');
    };

    const handleInputChange = (field, value) => {
        let error = '';

        switch (field) {
            case 'title':
                error = validateInputRequire(value, 3, 100);
                break;
            case 'description':
                error = validateInputRequire(value, 5, 1000);
                break;
            default:
                break;
        }

        setTaskData((prev) => ({ ...prev, [field]: value }));
        setErrTaskData((prev) => ({ ...prev, [field]: error }));
    };

    const handleSaveTask = async () => {
        handleInputChange('title', taskData.title);
        handleInputChange('description', taskData.description);

        if (!taskData.title || !taskData.description) {
            toast.warning('Please fill in all required fields correctly!');
            return;
        }
        for (var key in errTaskData) {
            if (errTaskData[key]) {
                toast.warning('Please fill in all information.');
                return;
            }
        }
        const id = toast.loading('Creating task...');
        try {
            const newTask = {
                ...taskData,
                assignee: selectedOptionUser || '',
                status: selectedStatus,
            };
            const res = await axios({
                method: _createTasks.method,
                url: _createTasks.url,
                data: newTask,
                withCredentials: true,
            });

            if (res.data.status === 200) {
                toast.update(id, {
                    render: 'Create success',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                    closeButton: true,
                });
                fetchTasks();
                toggleCreateModal();
            } else {
                toast.update(id, {
                    render: `Task creation failed!`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                    closeButton: true,
                });
            }
        } catch (error) {
            toast.update(id, {
                render: `Failed to create task: ${error.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
                closeButton: true,
            });
        }
    };
    const handleUpdateTask = async () => {
        const updatedTask = {
            ...taskData,
            assignee: selectedOptionUser || '',
            status: selectedStatus,
        };
        const id = toast.loading('Creating task...');
        try {
            const res = await axios({
                method: _updateTasks.method,
                url: `${_updateTasks.url}${updatedTask._id}`,
                data: updatedTask,
                withCredentials: true,
            });

            if (res.data.status === 200) {
                toast.update(id, {
                    render: 'Update success',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                    closeButton: true,
                });

                fetchTasks();
                toggleCreateModal();
            } else {
                toast.update(id, {
                    render: `Task update failed!`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                    closeButton: true,
                });
            }
        } catch (error) {
            toast.update(id, {
                render: `Failed to update task: ${error.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
                closeButton: true,
            });
        }
    };
    const openModal = (task) => {
        setSelectedTask(task);
        setTaskData({
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
        });
        setSelectedStatus(task.status);
        const assignedUser = users.find((user) => user._id === task.assignee?._id);
        setSelectedOptionUser(assignedUser ? assignedUser.value : '');
        setShowCreateModal(true);
    };

    const confirmDeleteTask = (task) => {
        setSelectedTask(task);
        setShowDeleteModal(!showDeleteModal);
    };

    const handleDeleteTask = async () => {
        try {
            const res = await axios({
                method: _deleteTasks.method,
                url: `${_deleteTasks.url}${selectedTask._id}`,
                withCredentials: true,
            });

            if (res.data.status === 200) {
                toast.success('Delete successfull', {
                    autoClose: 3000,
                    closeOnClick: true,
                });
                fetchTasks();
                confirmDeleteTask();
            }
        } catch (error) {
            toast.error(`Delete failed`, {
                render: `${error.message}`,
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
            });
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
                                onClick={() => toggleCreateModal(column)}
                                className="mt-0"
                                icon={<NoteAddIcon size={12} color="#ffffff" variant="stroke" />}
                            />
                        </div>

                        <div className="mt-3 space-y-2">
                            {tasks[column].map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-gray-700 text-white p-2 rounded-md flex items-center justify-between"
                                >
                                    <span
                                        className="w-full truncate"
                                        onClick={() => openModal(task)}
                                        title={task.title}
                                    >
                                        {task.title}
                                    </span>
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
                onClickAccept={selectedTask ? handleUpdateTask : handleSaveTask}
            >
                <div className="grid gap-3">
                    <input
                        type="text"
                        placeholder="Enter title..."
                        className="w-full p-2 border rounded"
                        value={taskData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                    <span className="text-error text-xs">{errTaskData.title}</span>
                    <textarea
                        placeholder="Enter description..."
                        className="w-full p-2 border rounded resize-y max-h-32"
                        maxLength={300}
                        value={taskData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <span className="text-error text-xs">{errTaskData.description}</span>
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
                onClick={confirmDeleteTask}
                onClickAccept={handleDeleteTask}
            >
                {selectedTask && <p>Are you sure you want to delete the task {selectedTask.title}?</p>}
            </Modal>
        </div>
    );
};

export default Task;
