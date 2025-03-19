import { SERVER_URL } from '~/config';
export const _getTask = {
    url: `${SERVER_URL}/tasks/`,
    method: 'GET',
};
export const _createTasks = {
    url: `${SERVER_URL}/tasks/`,
    method: 'POST',
};
export const _updateTasks = {
    url: `${SERVER_URL}/tasks/`,
    method: 'PATCH',
};
export const _deleteTasks = {
    url: `${SERVER_URL}/tasks/`,
    method: 'DELETE',
};
