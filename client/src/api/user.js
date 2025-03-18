import { SERVER_URL } from '~/config';
export const _getUsers = {
    url: `${SERVER_URL}/users/`,
    method: 'GET',
};
export const createUser = {
    url: `${SERVER_URL}/users/`,
    method: 'POST',
};
export const getUserById = {
    url: `${SERVER_URL}/users/`,
    method: 'GET',
};
