import React from 'react';
import Modal from '~/components/Modal';
import SelectGroup from '~/components/Selected';
const UserUpdateModal = ({
    showModal,
    toggleModal,
    handleShowAlert,
    selectedUser,
    handleInputChange,
    errors,
    gender,
    selectedGender,
    setSelectedGender,
}) => {
    return (
        <Modal
            title="Update information user"
            _showModal={showModal}
            onClick={toggleModal}
            onClickAccept={handleShowAlert}
        >
            {selectedUser ? (
                <form className="grid gap-4">
                    {[
                        { label: 'Full Name', key: 'full_name', type: 'text' },
                        { label: 'Email', key: 'email', type: 'email' },
                        { label: 'Birth of year', key: 'dob', type: 'number' },
                    ].map((field) => (
                        <div key={field.key} className="flex items-center">
                            <p className="w-40">{field.label}:</p>
                            <div className="flex flex-col w-full">
                                <input
                                    type={field.type}
                                    className="border border-gray-600 rounded px-3 py-2 w-full"
                                    value={selectedUser[field.key] || ''}
                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                />
                                {errors[field.key] && <span className="text-red-500 text-xs">{errors[field.key]}</span>}
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center">
                        <p className="w-40">Gender:</p>
                        <div className="w-full border border-gray-600 rounded">
                            <SelectGroup
                                data={gender}
                                selectedOption={selectedGender}
                                setSelectedOption={setSelectedGender}
                            />
                        </div>
                    </div>
                </form>
            ) : null}
        </Modal>
    );
};

export default UserUpdateModal;
