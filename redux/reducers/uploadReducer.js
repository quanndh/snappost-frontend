const initialState = {
    createPostUploadPercent: 0
}

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CREATE_POST_UPLOAD_PERCENT':
            return { ...state, createPostUploadPercent: action.data }
        default:
            return state;
    }
}

export default uploadReducer;