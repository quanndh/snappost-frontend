const initialState = {
    user: {},
    token: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_INFO":
            return { ...state, user: action.data.user, token: action.data.token }
        case "SET_USER_IMAGE":
            let tempUser = { ...state.user };
            user[action.data.type] = action.data.image;
            return { ...state, user: tempUser };
        default:
            return state
    }
}

export default userReducer;

