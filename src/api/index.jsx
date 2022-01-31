import axios from 'axios';

import config from '../config';

const isHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true;
};

const requestHandler = (request) => {
    if (isHandlerEnabled(request)) {
        const token = localStorage.getItem('mae_authorization');

        if(token != null) {
            request.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return request;
};

const instance = axios.create({
    baseURL: config.api_gateway
});

instance.interceptors.request.use(
    request => requestHandler(request)
);

export default instance;
