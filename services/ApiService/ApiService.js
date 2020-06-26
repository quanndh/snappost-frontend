let store = null;

export default {
    setStore: newStore => {
        store = newStore;
    },
    toggleCreatePost: () => {
        store.dispatch({ type: "TOGGLE_CREATE_POST" })
    },
    getToken: () => {
        if (store && store.getState().userReducer.token) {
            return store.getState().userReducer.token
        }
        return localStorage.getItem('token')
    },
    login: (userInfo, token) => {
        store.dispatch({ type: 'SET_USER_INFO', data: { user: userInfo, token } })
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userInfo))
    },
    logout: () => {
        store.dispatch({ type: 'SET_USER_INFO', data: { user: {}, token: "" } })
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    },

    setNewFeed: data => {
        store.dispatch({ type: 'SET_POST', data })
    },
    setCommentForPost: data => {
        store.dispatch({ type: 'SET_POST_COMMENT', data })
    },
    setPostTotalShare: data => {
        store.dispatch({ type: 'SET_POST_TOTAL_SHARE', data })
    },
    setReplyForComment: data => {
        store.dispatch({ type: 'SET_COMMENT_REPLY', data })
    },
    toggleLikePost: data => {
        store.dispatch({ type: 'TOGGLE_LIKE_POST', data })
    },
    toggleLikeComment: data => {
        store.dispatch({ type: 'TOGGLE_LIKE_COMMENT', data })
    },
    toggleLikeReply: data => {
        store.dispatch({ type: 'TOGGLE_LIKE_REPLY', data })
    },
    setCreatePostUploadPercent: data => {
        store.dispatch({ type: 'SET_CREATE_POST_UPLOAD_PERCENT', data })
    }
}