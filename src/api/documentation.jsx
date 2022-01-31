import axios from '../api';

export const findAllDocumentation = () => {
    return axios.get(`/api/documentation/`)
                .then(resp => resp.data);
};

export const findDocumentationsByPage = (page=0, size=10) => {
    return axios.get(`/api/documentation/page`, {
        params: {
            page,
            size
        }
    })
    .then(resp => resp.data);
};

export const findDocumentationById = documentationId => {
    return axios.get(`/api/documentation/${documentationId}`)
                .then(resp => resp.data);
};

export const saveDocumentation = body => {
    return axios.post('/api/documentation', body)
                .then(resp => resp.data);
};

export const deleteDocumentation = documentationId => {
    return axios.delete(`/api/documentation/${documentationId}`)
                .then(resp => resp);
};
