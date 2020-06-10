import React from 'react';
import { connect } from 'react-redux'
import ApiService from '../../services/ApiService/ApiService';

const LightOff = props => {

    const { showCreatePost } = props

    return (
        <>
            {
                showCreatePost ? <div className="lightoff" onClick={() => {
                    if (showCreatePost) ApiService.toggleCreatePost();
                }} /> : null
            }
        </>

    )
}

const mapStateToProps = state => {
    return {
        showCreatePost: state.uiReducer.showCreatePost
    }
}

export default connect(mapStateToProps)(LightOff);