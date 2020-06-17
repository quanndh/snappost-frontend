import request from './request';
import upload from './upload';

export default {
    signup: data => {
        return request("/user/create", data, "POST")
    },
    login: data => {
        return request("/auth/login", data, "POST")
    },
    loginSocialNetwork: data => {
        return request('/auth/login-social-network', data, "POST")
    },
    uploadImage: data => {
        return upload('/file/upload-image', data)
    },
    uploadFile: data => {
        return upload('/file/upload-file', data)
    },
    findTagFriend: data => {
        return request("/user/find-tag-name", data, "POST");
    }
};