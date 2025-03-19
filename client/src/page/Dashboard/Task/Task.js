import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { _createTasks, _deleteTasks, _getTask, _updateTasks } from '~/api/task';
import { _getAllUsers } from '~/api/user';
import Modal from '~/components/Modal';
import SelectGroup from '~/components/Selected';
import axios from '~/config/configAxios';
import { validateInputRequire } from '~/utils/validate';
import Column from './Column';

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
        fetchData();
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
        const id = toast.loading('Updating task...');
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
        console.log(assignedUser);

        setSelectedOptionUser(assignedUser ? assignedUser._id : '');
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
    const handleDrop = async (task, newStatus) => {
        if (task.status === newStatus) return;
        console.log(task);

        const updatedTask = { ...task, assignee: task.assignee?._id, status: newStatus };
        const id = toast.loading('Updating task...');

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

    const moveTask = (columnStatus, fromIndex, toIndex) => {
        setTasks((prevTasks) => {
            const updatedColumn = [...prevTasks[columnStatus]]; // Copy danh sách task của cột hiện tại
            const [movedTask] = updatedColumn.splice(fromIndex, 1); // Lấy task bị kéo ra khỏi danh sách
            updatedColumn.splice(toIndex, 0, movedTask); // Chèn lại task vào vị trí mới

            return { ...prevTasks, [columnStatus]: updatedColumn }; // Cập nhật state tasks
        });
    };
    const moveTaskBetweenColumns = (taskId, fromStatus, toStatus) => {
        setTasks((prevTasks) => {
            const task = prevTasks[fromStatus].find((t) => t._id === taskId);
            if (!task) return prevTasks;

            const updatedFromColumn = prevTasks[fromStatus].filter((t) => t._id !== taskId);
            const updatedToColumn = [...prevTasks[toStatus], { ...task, status: toStatus, assignee: task.assignee }];

            return {
                ...prevTasks,
                [fromStatus]: updatedFromColumn,
                [toStatus]: updatedToColumn,
            };
        });

        const movedTask = tasks[fromStatus].find((t) => t._id === taskId);
        console.log(movedTask);

        if (movedTask) {
            handleDrop({ ...movedTask, assignee: movedTask.assignee }, toStatus);
        }
    };

    return (
        <div className="min-h-screen p-8 flex justify-center items-start bg-gray-100">
            <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
                {['Todo', 'Doing', 'Done'].map((status) => (
                    <Column
                        key={status}
                        status={status}
                        tasks={tasks}
                        setTasks={setTasks}
                        moveTask={moveTask}
                        toggleCreateModal={toggleCreateModal}
                        openModal={openModal}
                        moveTaskBetweenColumns={moveTaskBetweenColumns}
                        confirmDeleteTask={confirmDeleteTask}
                    />
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
