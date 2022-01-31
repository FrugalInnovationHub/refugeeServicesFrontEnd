import axios from '../api';

export const findAllQuestions = () => {
    return axios.get('/api/questions')
                .then(resp => resp.data);
};

export const getMockTestQuestions = (sampleSize=20) => {
    return axios.get('/api/questions/mockTest', { params: { sampleSize }})
                .then(resp => resp.data);
};

export const findQuestionById = _id => {
    return axios.get(`/api/questions/${_id}`)
                .then(resp => resp.data);
};

export const saveQuestion = body => {
    return axios.post('/api/questions', body)
                .then(resp => resp.data)
                .catch(error => error && error.response && error.response.status);
};

export const updateQuestion = (_id, body) => {
    return axios.put(`/api/questions/${_id}`, body)
                .then(resp => resp.data)
                .catch(error => error && error.response && error.response.status);
};

export const deleteQuestion = _id => {
    return axios.delete(`/api/questions/${_id}`)
                .then(resp => resp);
};

export const findQuestionsByKeywords = keywords => {
    return axios.get('/api/questions/find', { params: { keywords }})
                .then(resp => resp.data);
};

export const getMockTestSettings = () => {
    return axios.get('/api/questions/mockTest/config')
                .then(resp => resp.data)
                .catch(error => error && error.response && error.response.status);
}

export const updateMockTestSettings = body => {
    return axios.put('/api/questions/mockTest/config', body)
                .then(resp => resp.data)
                .catch(error => error && error.response && error.response.status);
}