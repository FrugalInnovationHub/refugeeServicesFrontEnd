import axios from '../api';

export const uploadFile = file => {
    const data = new FormData(); 
    data.append('file', file);
    
    return axios.post('/api/s3/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    .then(resp => resp.data);
};
