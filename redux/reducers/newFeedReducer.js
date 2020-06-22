const initialState = {
    posts: []
}

const newFeedReducer = (state = initialState, action) => {
    let tempPost = [...state.posts];
    let postIndex, commentIndex;

    switch (action.type) {
        case 'SET_POST':
            return { ...state, posts: action.data }
        case 'SET_POST_COMMENT':
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                action.data.data.map(comment => {
                    tempPost[postIndex]['comments'].push(comment)
                })
            }
            if (action.data.newComment) {
                tempPost[postIndex]['totalComment']++;
            }
            return { ...state, posts: tempPost }
        case 'TOGGLE_LIKE_POST':
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                if (action.data.like) {
                    tempPost[postIndex]['totalLike']++;
                } else {
                    tempPost[postIndex]['totalLike']--;
                }
            }
            return { ...state, posts: tempPost }
        case 'TOGGLE_LIKE_COMMENT':
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                commentIndex = tempPost[postIndex]['comments'].findIndex(comment => comment.id == action.data.commentId)
                if (commentIndex !== -1) {
                    if (action.data.like) {
                        tempPost[postIndex]['comments'][commentIndex]['totalLike']++;
                    } else {
                        tempPost[postIndex]['comments'][commentIndex]['totalLike']--;
                    }
                }
            }
            return { ...state, posts: tempPost }
        default:
            return state;
    }
}

export default newFeedReducer;