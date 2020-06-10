import request from './request';

export default {
    signup: data => {
        return request("/user/create", data, "POST")
    }
};