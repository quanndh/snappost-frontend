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
    uploadVideo: data => {
        return upload('/file/upload-video', data)
    },
    findTagFriend: data => {
        return request("/user/find-tag-name", data, "POST");
    },
    getUserProfile: data => {
        return request('/user/get-profile', data, "POST")
    },
    createPost: data => {
        return request("/post/create", data, "POST");
    },
    getPost: data => {
        return request('/post/get-posts', data, "POST");
    },
    comment: data => {
        return request('/comment/create', data, "POST");
    },
    getParentComment: data => {
        return request('/comment/get-comment', data, "POST");
    },
    getReplyComment: data => {
        return request("/comment/get-comment", data, "POST");
    },
    toggleLikePost: data => {
        return request("/post/toggle-like", data, "POST");
    },
    toggleLikeComment: data => {
        return request("/comment/toggle-like", data, "POST");
    },
    sharePost: data => {
        return request("/post/share", data, "POST")
    },
    deletePost: data => {
        return request("/post/delete", data, "DELETE")
    },
    updatePost: data => {
        return request("/post/edit", data, "PATCH")
    }
};