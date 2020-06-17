import React from 'react';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VideocamIcon from '@material-ui/icons/Videocam';

const UserInfoTooltip = props => {
    let { user } = props;

    return (
        <div style={{ zIndex: 30 }} className="user-tooltip-container">
            <div className="user-tooltip-header">
                <img src={user.wallImage} className="user-tooltip-wallpic" />
                <div className="user-tooltip-avatar">
                    <Link href={`/profile/${user.id}`}>
                        <>
                            <img src={user.avatar} />
                            <Typography variant="h5">{user.name}</Typography>
                        </>
                    </Link>
                </div>
            </div>
            <div className="user-tooltip-info">
                <p><HomeIcon /> Live in Ha Noi</p>
                <p><PeopleIcon /> 10 common friends</p>
            </div>
            <div className="user-tooltip-action">
                <button className="user-tooltip-action-item">
                    <VideocamIcon />
                </button>
                <button className="user-tooltip-action-item">
                    <EmailIcon />
                </button>
                <button className="user-tooltip-action-item">
                    <PersonAddIcon /> Send friend request
                </button>
            </div>
        </div >
    )
}

export default UserInfoTooltip;