import React, { useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import Username from "../Username/Username";
import DataService from '../../network/DataService';
import CustomTooltip from '../CustomTooltip/CustomTooltip';

const UserCard = ({ user }) => {
    const [requested, setRequested] = useState(false)
    const handleAddFriend = async () => {
        await DataService.setFriendRequest({ id: user.id });
        setRequested(!requested);
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
            <CustomTooltip title={requested ? "Click to remove friend request" : "Click to send friend request"}>
                <div className="primary-button" onClick={handleAddFriend}>
                    {
                        requested ? <span>Friend request sent</span> : <span>Add friend</span>
                    }
                </div>
            </CustomTooltip>

        </Paper >
    )
}

export default UserCard;