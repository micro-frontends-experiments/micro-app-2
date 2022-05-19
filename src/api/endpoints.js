import api from './index';

export const getUser = (userId) => api
    .get(`/user?id=${userId}`)
    .then((res) => res.data);
