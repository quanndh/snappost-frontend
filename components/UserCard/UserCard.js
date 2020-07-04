import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Username from "../Username/Username";
import DataService from '../../network/DataService';

const UserCard = ({ user }) => {

    const handleAddFriend = async () => {
        let rs = await DataService.setFriendRequest({ id: user.id });
    }

    return (
        <Paper className="user-card-container">
            <div className="user-card-user">
                <img src={user.avatar} />
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <Username name={user.firstName + " " + user.lastName} id={user.id} />
                    <Typography varient="subtitle1">{user.mutualFriend} mutual friends</Typography>
                </div>
            </div>
            <div className="primary-button" onClick={handleAddFriend}>
                <span>Add friend</span>
            </div>
        </Paper>
    )
}

export default UserCard;