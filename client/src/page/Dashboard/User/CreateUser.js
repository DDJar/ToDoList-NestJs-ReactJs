import axios from '~/config/configAxios';
import { useState } from 'react';
import Button from '~/components/Button';
import SelectGroup from '~/components/Selected';
import { validateInputRequire, validateRange } from '~/utils/validate';
import { _createUser } from '~/api/user';
import { validateEmail } from '~/utils/validate';
import { validateBirthYear } from '~/utils/validate';
import { toast } from 'react-toastify';

function CreateUser() {
    const Gender = [
        { value: 'true', title: 'Male' },
        { value: 'false', title: 'Female' },
    ];

    const [selectedOptioGender, setSelectedOptionGender] = useState('');
    const [dataInput, setDataInput] = useState({
        full_name: '',
        username: '',
        email: '',
        gender: '',
        dob: '',
    });
    const [errInput, setErrInput] = useState({
        full_name: '',
        username: '',
        email: '',
        gender: '',
        dob: '',
    });

    const handleChange = (_name, _value) => {
        var err = '';

        switch (_name) {
            case 'full_name':
                err = validateInputRequire(_value, 5, 100);
                break;
            case 'username':
                err = validateRange(_value, 16, 30);
                break;
            case 'email':
                err = validateEmail(_value);
                break;
            case 'dob':
                err = validateBirthYear(_value);
                break;
            default:
                return;
        }
        setDataInput((prev) => ({ ...prev, [_name]: _value }));
        setErrInput((prev) => ({ ...prev, [_name]: err }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleChange('full_name', dataInput.full_name);
        handleChange('username', dataInput.username);
        handleChange('email', dataInput.email);
        handleChange('dob', dataInput.dob);

        errInput.selectedOptioGender = !selectedOptioGender ? 'Gender required!!' : '';
        if (!dataInput.full_name || !dataInput.username || !dataInput.email || !dataInput.dob) {
            toast.warning('Please fill in all information.');
            return;
        }
        for (var key in errInput) {
            if (errInput[key]) {
                toast.warning('Please fill in all information.');
                return;
            }
        }
        const id = toast.loading('Please wait...');
        const _data = {
            username: dataInput.username,
            email: dataInput.email,
            full_name: dataInput.full_name,
            gender: selectedOptioGender,
            dob: dataInput.dob,
        };
        try {
            const res = await axios({
                method: _createUser.method,
                url: _createUser.url,
                data: _data,
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
                setDataInput({
                    full_name: '',
                    username: '',
                    email: '',
                    gender: '',
                    dob: '',
                });
                setSelectedOptionGender('');
                setErrInput({
                    full_name: '',
                    username: '',
                    email: '',
                    gender: '',
                    dob: '',
                });
            } else if (res.data.status == 400 && res.data.message == 'Email already exists in the system') {
                toast.update(id, {
                    render: `Email already exists!!`,
                    type: 'warning',
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                    closeButton: true,
                });
            } else if (res.data.status === 400 && res.data.message === 'Username already exists in the system') {
                toast.update(id, {
                    render: `Username already exists!!`,
                    type: 'warning',
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                    closeButton: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast.update(id, {
                render: `Create failed ${error.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
                closeButton: true,
            });
        }
    };
    return (
        <div className="">
            <div className="flex space-x-4 mb-4">
                <h1>Tạo xe đưa đón</h1>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <form action="#" onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-24 xl:flex-row">
                            <div className="">
                                <label className="mb-2.5 block text-black " htmlFor="username">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    placeholder="Enter full name"
                                    value={dataInput.full_name}
                                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                                />
                                <span className="text-error text-xs">{errInput.full_name}</span>
                            </div>

                            <div className="">
                                <label className="mb-2.5 block text-black " htmlFor="username">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter username"
                                    value={dataInput.username}
                                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                                />
                                <span className="text-error text-xs">{errInput.username}</span>
                            </div>
                        </div>
                        <div className="mb-4.5 flex flex-col gap-24 xl:flex-row">
                            <div className="">
                                <label className="mb-2.5 block text-black " htmlFor="tuition">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter email"
                                    value={dataInput.email}
                                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                                />
                                <span className="text-error text-xs">{errInput.email}</span>
                            </div>
                            <div className="w-40">
                                <label className="mb-2.5 block text-black " htmlFor="gender">
                                    Gender
                                </label>
                                <SelectGroup
                                    data={Gender}
                                    selectedOption={selectedOptioGender}
                                    setSelectedOption={setSelectedOptionGender}
                                />
                                <span className="text-error text-xs ml-5">{errInput.selectedOptioGender}</span>
                            </div>
                            <div className="">
                                <label className="mb-2.5 block text-black " htmlFor="dob">
                                    Birth of year
                                </label>
                                <input
                                    type="number"
                                    id="dob"
                                    placeholder="Enter birth of year"
                                    value={dataInput.dob}
                                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                                />
                                <span className="text-error text-xs">{errInput.dob}</span>
                            </div>
                        </div>
                        <Button primary large roundedMd>
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
