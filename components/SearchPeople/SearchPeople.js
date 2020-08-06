import React from 'react';
import { Paper, Button, Avatar, Typography } from '@material-ui/core';
import Username from '../Username/Username';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';



const SearchPeople = ({ user }) => {
    let additionInfo = [];
    if (user.isFriend) {
        additionInfo.push("Your friend");
    }
    if (user.isRequest == 1) {
        additionInfo.push("Sent friend request to you");
    } else if (user.isRequest == 0) {
        additionInfo.push("You sent request to this person")
    }
    if (user.currentLocation) {
        additionInfo.push("Live in " + user.currentLocation);
    }
    if (user.school) {
        additionInfo.push("Study at " + user.school)
    }
    if (user.company) {
        additionInfo.push("Work at " + user.company);
    }

    console.log(additionInfo);

    return (
        <Paper className="search-people-container">
            <div>
                <Avatar className="avatar" src={user.avatar} />
            </div>
            <div className="user-container">
                <div className="info-container">
                    <div className="info">
                        <Username name={user.firstName + " " + user.lastName} id={user.id} size="large" />
                        <Typography>{additionInfo[0]}</Typography>
                    </div>
                    <div>
                        {
                            user.mutualFriend > 0 ? <Typography>{user.mutualFriend} mutual friend</Typography> : null
                        }
                        <Typography>{additionInfo[1]}</Typography>
                    </div>
                </div>
                <div className="action">
                    {
                        user.isFriend ? (
                            <CustomTooltip title="Unfriend">
                                <div className="primary-button">
                                    <CloseIcon />
                                </div>
                            </CustomTooltip>
                        ) : (
                                user.isRequest == 2 ? (
                                    <CustomTooltip title="Add friend">
                                        <div className="primary-button">
                                            <PersonAddIcon />
                                        </div>
                                    </CustomTooltip>
                                ) : (
                                        user.isRequest == 0 ? (
                                            <CustomTooltip title="Remove friend request">
                                                <div className="primary-button">
                                                    <PersonAddDisabledOutlinedIcon />
                                                </div>
                                            </CustomTooltip>
                                        ) : (
                                                <div>
                                                    <CustomTooltip title="Accept">
                                                        <div className="primary-button">
                                                            <DoneIcon />
                                                        </div>
                                                    </CustomTooltip>
                                                    <CustomTooltip title="Reject">
                                                        <div className="primary-button">
                                                            <CloseIcon />
                                                        </div>
                                                    </CustomTooltip>
                                                </div>
                                            )
                                    )
                            )
                    }
                </div>
            </div>
        </Paper>
    )
}

export default SearchPeople;