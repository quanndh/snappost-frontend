let initialState = {
    showCreatePost: false
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_CREATE_POST":
            return { ...state, showCreatePost: !state.showCreatePost }
        default:
            return state;
    }
}

export default uiReducer;