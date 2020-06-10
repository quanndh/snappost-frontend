import request from './request';

export default {
    signup: data => {
        return request("/user/create", data, "POST")
    },
    login: data => {
        return request("/auth/login", data, "POST")
    }
};