import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PencilEdit02Icon } from 'hugeicons-react';
import Button from '~/components/Button';
import axios from '~/config/configAxios';
import { _getUsers } from '~/api/user';
import { toast } from 'react-toastify';
// import Modal from '~/components/Modal';
// import SelectGroup from '~/components/Selected';
import useDebounce from '~/utils/useDebounce';
import { renderEmptyRows } from '~/utils/form';
const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const tab = queryParams.get('tab') ? parseInt(queryParams.get('tab')) : 1;
    const [currentPage, setCurrentPage] = useState(tab);
    const [totalPages, setTotalPages] = useState(1);
    // const [selectedUser, setSelectedUser] = useState(null);
    // const [showModal, setShowModal] = useState(false);
    const debouncedValue = useDebounce(searchTerm.trim(), 500);
    // const [errors, setErrors] = useState({
    //     fullName: '',
    //     username: '',
    //     email: '',
    //     gender: '',
    //     dob: '',
    // });

    useEffect(() => {
        if (debouncedValue && debouncedValue.trim() !== '') {
            fetchSearchData();
        } else {
            fetchData();
        }
    }, [tab, currentPage, location.pathname]);

    useEffect(() => {
        fetchSearchData();
    }, [debouncedValue]);

    const fetchData = async () => {
        const data = {
            tab: currentPage,
        };
        try {
            const res = await axios({
                method: _getUsers.method,
                url: _getUsers.url,
                params: data,
                withCredentials: true,
            });
            console.log(res);

            if (res.data.status === 200) {
                setUsers(res.data.data.users);
                setTotalPages(res.data.data.totalPages);
                setCurrentPage(tab);
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
    const fetchSearchData = async () => {
        let mounted = true;
        const data = {
            role: role,
            tab: currentPage,
            search: debouncedValue,
        };
        try {
            const res = await axios({
                method: searchUsers.method,
                url: searchUsers.url,
                params: data,
                withCredentials: true,
            });
            if (mounted) {
                if (res.data.status === 200) {
                    setUsers(res.data.data.users);
                    setTotalPages(res.data.data.totalPages);
                    setCurrentPage(tab);
                } else {
                    console.error('error');
                }
            }
        } catch (error) {
            toast.error(`Hiển thị thất bại`, {
                render: `${error.message}`,
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
            });
        }
        return () => {
            mounted = false;
        };
    };

    // const validation = (value) => {
    //     return (
    //         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    //         /^(09|03|07|08|05)\d{8}$/.test(value) ||
    //         /^[A-Za-zÀÁÂÃÈÉÊÌÍÎÏÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíîïòóôõùúăđĩũơƯĂẠ-ỹ\s'-]+$/i.test(value)
    //     );
    // };
    // const validationPhone = (value) => {
    //     return /^(09|03|07|08|05)\d{8}$/.test(value);
    // };
    // const handleInputChange = (field, value) => {
    //     setSelectedUser({ ...selectedUser, [field]: value });
    //     switch (field) {
    //         case 'username':
    //             setErrors({
    //                 ...errors,
    //                 username: value ? '' : 'Tên người dùng không được để trống!',
    //             });
    //             break;
    //         case 'email':
    //             setErrors({
    //                 ...errors,
    //                 email: validation(value) || selectedUser.email ? '' : 'Email không hợp lệ!',
    //             });
    //             break;

    //         case 'phone':
    //             setErrors({
    //                 ...errors,
    //                 phone:
    //                     value.length < 10 || !validationPhone(value) || !selectedUser.phone
    //                         ? 'Số điện thoại không hợp lệ! (Phải có đủ 10 chữ số)'
    //                         : '',
    //             });
    //             break;

    //         default:
    //             break;
    //     }
    // };
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            navigate(`/dashboards/users/view-list?tab=${newPage}`);
        }
    };

    // const toggleModal = () => {
    //     setShowModal(!showModal);
    //     setErrors('');
    // };
    // const handleShowAlert = async () => {
    //     const hasErrors = Object.values(errors).some((error) => error !== '');
    //     const isMissingDetail =
    //         !selectedUser.fullName ||
    //         !selectedUser.username ||
    //         !selectedUser.email ||
    //         !selectedUser.gender ||
    //         !selectedUser.dob;
    //     if (hasErrors || isMissingDetail) {
    //         toast.warning('Vui lòng điền đầy đủ thông tin.');
    //         return;
    //     }

    //     try {
    //         const data = {
    //             fullName: selectedUser.fullName,
    //             email: selectedUser.email,
    //             username: selectedUser.username,
    //             gender: selectedUser.gender,
    //             dob: selectedUser.dob,

    //         };
    //         const res = await axios({
    //             method: updateUsers.method,
    //             url: `${updateUsers.url}/${selectedUser._id}`,
    //             data: data,
    //             withCredentials: true,
    //         });
    //         console.log(res.data);
    //         if (res.data.status === 200) {
    //             setCurrentPage(tab);
    //             toast.success('Cập nhật thành công', {
    //                 autoClose: 3000,
    //                 closeOnClick: true,
    //             });
    //             fetchData();
    //             toggleModal();
    //             setSelectedRole('');
    //         } else if (res.data.status === 400 && res.data.message === 'Duplicate username') {
    //             toast.warning('Tên người dùng đã tồn tại.Vui lòng chọn tên khác');
    //         } else if (res.data.status === 400 && res.data.message === 'Duplicate email.') {
    //             toast.warning('Email đã tồn tại.Vui lòng chọn email.');
    //         } else if (res.data.status === 400 && res.data.message === 'Duplicate phone.') {
    //             toast.warning('Số điện thoại đã tồn tại.Vui lòng chọn số khác.');
    //         }
    //     } catch (error) {
    //         toast.error(`Cập nhật thất bại`, {
    //             render: `${error.message}`,
    //             isLoading: false,
    //             autoClose: 3000,
    //             closeOnClick: true,
    //         });
    //     }
    // };
    // const handleOpenModal = (userItem) => {
    //     toggleModal();
    //     setSelectedUser(userItem);
    // };
    return (
        <div>
            <h1>User Management</h1>
            <div className="container"></div>
            <div className="w-full">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex">
                        <div className="m-3 flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                            <label htmlFor="table-search" className="sr-only">
                                Tìm kiếm
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Nhập vào ô tìm kiếm..."
                                    // value={searchTerm}
                                    // onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <table className="w-full  min-h-100 text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3 text-center">Index</th>
                                <th className="px-6 py-3 ">Full Name</th>
                                <th className="px-6 py-3">User name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Gender</th>
                                <th className="px-6 py-3">Birth of year</th>
                                <th className="px-6 py-3">Number task</th>
                                <th className="px-6 py-3">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center ">
                                        <div className="w-full justify-center  flex">
                                            <h1 className="text-center  ">List empty</h1>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4  text-center">{index + 1 + (currentPage - 1) * 5}</td>
                                        <td className="px-6 py-4 text-wrap">{user.full_name}</td>
                                        <td className="px-6 py-4">{user.username}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.gender ? 'Male' : 'Female'}</td>
                                        <td className="px-6 py-4">{user.dob}</td>

                                        <td className="px-6 py-4">
                                            <div className="flex">
                                                <>
                                                    <Button
                                                        outlineInfo
                                                        className={'mr-3'}
                                                        icon={
                                                            <PencilEdit02Icon
                                                                size={24}
                                                                color={'#223dec'}
                                                                variant={'stroke'}
                                                                // onClick={() => handleOpenModal(user)}
                                                            />
                                                        }
                                                    />
                                                </>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            {users.length > 0 && renderEmptyRows(5, users.length, 6)}
                        </tbody>
                    </table>
                    <div className="justify-center flex mb-4">
                        <div className="flex justify-between mt-4 w-122 items-center">
                            <Button
                                primary
                                onClick={() => handlePageChange(currentPage - 1)}
                                disable={currentPage === 1}
                                roundedMd
                            >
                                Previous page
                            </Button>
                            <span>Page {currentPage}</span>
                            <Button
                                primary
                                onClick={() => handlePageChange(currentPage + 1)}
                                disable={currentPage === totalPages || users.length < 3}
                                roundedMd
                            >
                                Next page
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
