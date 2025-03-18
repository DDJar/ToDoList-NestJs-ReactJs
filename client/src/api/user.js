import { SERVER_URL } from '~/config';
export const _getUsers = {
    url: `${SERVER_URL}/users/`,
    method: 'GET',
};
export const createUser = {
    url: `${SERVER_URL}/users/`,
    method: 'POST',
};
export const searchUsers = {
    url: `${SERVER_URL}/users/search`,
    method: 'GET',
};
export const updateUsers = {
    url: `${SERVER_URL}/users/`,
    method: 'PATCH',
};

export const deleteUsers = {
    url: `${SERVER_URL}/users/`,
    method: 'DELETE',
};
