const initialState = {
    user: {},
    token: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_INFO":
            return { ...state, user: action.data.user, token: action.data.token }
        case "SET_USER_INFO_ONLY":
            return { ...state, user: action.data }
        default:
            return state
    }
}

export default userReducer;

