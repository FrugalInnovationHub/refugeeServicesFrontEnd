import axios from '../api';

export const findAllStatusTreeBranches = () => {
    return axios.get(`/api/statusTree/`)
                .then(resp => resp.data);
};

export const findStatusTreeBranch = (branchId) => {
    return axios.get(`/api/statusTree/branch/${branchId}`)
                .then(resp => resp.data);
};
