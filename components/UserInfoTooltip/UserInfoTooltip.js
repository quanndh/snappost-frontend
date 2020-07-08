import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import Link from 'next/link';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VideocamIcon from '@material-ui/icons/Videocam';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import RoomIcon from '@material-ui/icons/Room';
import CheckIcon from '@material-ui/icons/Check';
const UserInfoTooltip = props => {
    let { user } = props;

    return (
        <Paper style={{ zIndex: 30 }} className="user-tooltip-container">
            <div className="user-tooltip-header">
                <div className="user-tooltip-avatar">
                    <img src={user.avatar} alt="User avatar" />
                </div>
                <div className="user-tooltip-info">
                    <p className="user-tooltip-name">{user.name}</p>
                    {
                        user?.currentLocation ? <p className="user-tooltip-info-item"><HomeIcon className="icon" />  Live in {user?.currentLocation}</p> : null
                    }
                    {
                        user?.company ? <p className="user-tooltip-info-item"><WorkIcon className="icon" />  Work at {user.company}</p> : null
                    }
                    {
                        user?.school ? <p className="user-tooltip-info-item"><SchoolIcon className="icon" />  Study at {user.school}</p> : null
                    }
                    {
                        user?.bornIn ? <p className="user-tooltip-info-item"><RoomIcon className="icon" />  Borned in {user.bornIn}</p> : null
                    }
                    <p className="user-tooltip-info-item"><PeopleIcon className="icon" />  {user.mutualFriend} mutual friends</p>
                </div>
            </div>

            <div className="user-tooltip-action">
                <div className="primary-button" style={{ width: "70%" }}>
                    {
                        user.isFriend ? (
                            <>
                                <EmailIcon />
                                <span>Message</span>
                            </>
                        ) : (
                                <>
                                    <PersonAddIcon />
                                    <span>Add friend</span>
                                </>

                            )
                    }

                </div>
                <div className="primary-button">
                    {
                        user.isFriend ? <CheckIcon /> : <EmailIcon />
                    }
                </div>
                <div className="primary-button">
                    <VideocamIcon />
                </div>
            </div>
        </Paper >
    )
}

export default UserInfoTooltip;