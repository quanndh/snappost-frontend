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
}