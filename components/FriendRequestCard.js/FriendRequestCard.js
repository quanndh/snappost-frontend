import React from 'react';
import { Paper, Button, Avatar } from '@material-ui/core';
import Username from '../Username/Username';
import DataService from '../../network/DataService';

const FriendRequestCard = ({ user, requestId }) => {

    const handleFriendRequest = async (status) => {
        await DataService.handleFriendRequest({ id: requestId, status });
    }

    return (
        <Paper className="friend-request-card">
            <div className="friend-request-info">
                <div className="friend-request-user-info">
                    <Avatar src={user.avatar} className="avatar" alt={user.firstName + ' ' + user.lastName} />
                    <Username name={user.firstName + " " + user.lastName} id={user.id} />
                </div>
                <span>{user.mutualFriend} mutual friends</span>
            </div>
            <div className="friend-request-action">
                <Button variant="contained" color="primary" onClick={() => handleFriendRequest(1)}>
                    Accept
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleFriendRequest(0)}>
                    Decline
                </Button>
            </div>
        </Paper >
    )
}

export default FriendRequestCard;