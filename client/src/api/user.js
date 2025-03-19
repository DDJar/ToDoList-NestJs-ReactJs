import { SERVER_URL } from '~/config';
export const _getUsers = {
    url: `${SERVER_URL}/users/`,
    method: 'GET',
};
export const _getAllUsers = {
    url: `${SERVER_URL}/users/view-all`,
    method: 'GET',
};
export const _createUser = {
    url: `${SERVER_URL}/users/`,
    method: 'POST',
};
export const _searchUsers = {
    url: `${SERVER_URL}/users/search`,
    method: 'GET',
};
export const _updateUsers = {
    url: `${SERVER_URL}/users/`,
    method: 'PATCH',
};

export const _deleteUsers = {
    url: `${SERVER_URL}/users/`,
    method: 'DELETE',
};
