import axios from '../api';


export const logonAdmin = (userId, password, confirmPassword, name) => logon('admin', userId, password, confirmPassword, name);

export const loginAdmin = (userId, password) => login('admin', userId, password);

export const logoutAdmin = () => logout('admin');

export const isAdminTokenValid = () => isTokenValid('admin');


export const logonAgent = (userId, password, confirmPassword, name) => logon('agent', userId, password, confirmPassword, name);

export const loginAgent = (userId, password) => login('agent', userId, password);

export const logoutAgent = () => logout('agent');

export const isAgentTokenValid = () => isTokenValid('agent');


export const logonClient = (userId, password, confirmPassword, name) => logon('client', userId, password, confirmPassword, name);

export const loginClient = (userId, password) => login('client', userId, password);

export const logoutClient = () => logout('client');

export const isClientTokenValid = () => isTokenValid('client');


const logon = (userType, userId, password, confirmPassword, name) => {
    return axios.post(`/api/${userType}/logon`, {
        userId,
        name,
        password,
        confirmPassword,
        userType: userType.toUpperCase()
    })
    .then(resp => resp.status);
}

const login = (userType, userId, password) => {
    return axios.post(`/api/${userType}/login`, {
        userId,
        password
    })
    .then(resp => {
        const { token, userId, userType } = resp.data;
        localStorage.setItem('mae_authorization', token);
        localStorage.setItem('mae_currentUserId', userId);
        localStorage.setItem('mae_currentUserType', userType);

        return resp.status;
    })
    .catch(error => error && error.response && error.response.status);
}

const logout = (userType) => {
    return axios.post(`/api/${userType}/logout`)
    .then(resp => {
        localStorage.removeItem('mae_authorization');
        localStorage.removeItem('mae_currentUserId');
        localStorage.removeItem('mae_currentUserType');

        return resp.status;
    })
    .catch(error => error && error.response && error.response.status);
}

const isTokenValid = (userType) => {
    return axios.get(`/api/${userType}/isValid`)
    .then(resp => resp.status === 200)
    .catch(error => false);
}

export const getUserList = (page, size=10) => {
    return axios.get(`/api/admin/users`, {
        params: {
            page,
            size
        }
    })
    .then(resp => resp.data)
    .catch(error => error && error.response && error.response.status);
}

export const addUser = (body) => {
    return axios.post(`/api/admin/users`, body)
    .then(resp => resp)
    .catch(error => error && error.response);
}

export const deleteUser = (_id) => {
    return axios.delete(`/api/admin/users/${_id}`)
        .then(resp => resp.status)
        .catch(error => error && error.response);
}

export const approveUser = ({ userId, userType }) => {
    return axios.post(`/api/admin/users/approve`, {
        userId,
        userType
    })
    .then(resp => resp)
    .catch(error => error && error.response);
}