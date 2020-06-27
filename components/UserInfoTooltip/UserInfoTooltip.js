import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import Link from 'next/link';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VideocamIcon from '@material-ui/icons/Videocam';
import Router from 'next/router';
import WorkIcon from '@material-ui/icons/Work';

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
                    <p className="user-tooltip-info-item"><HomeIcon className="icon" />  Live in Ha Noi</p>
                    <p className="user-tooltip-info-item"><WorkIcon className="icon" />  Working at Thu Do Multimedia</p>
                    <p className="user-tooltip-info-item"><PeopleIcon className="icon" />  20 mutual friends</p>
                </div>
            </div>

            <div className="user-tooltip-action">
                <div className="primary-button" style={{ width: "70%" }}>
                    <PersonAddIcon />
                    <span>Add friend</span>
                </div>
                <div className="primary-button">
                    <EmailIcon />
                </div>
                <div className="primary-button">
                    <VideocamIcon />
                </div>
            </div>
        </Paper >
    )
}

export default UserInfoTooltip;