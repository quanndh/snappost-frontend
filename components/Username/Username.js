import React, { useState } from 'react';
import UserInfoTooltip from '../UserInfoTooltip/UserInfoTooltip';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import DataService from '../../network/DataService';
import Router from 'next/router';
import { Paper, Typography } from '@material-ui/core';

const CustomUserName = props => {
    let { name, id, size } = props;

    const [open, setOpen] = React.useState(false);
    const mentionRef = React.useRef(null);
    const [userInfo, setUserInfo] = useState({})

    let delay;
    let hoverDelay;

    const handleToggleMention = async () => {
        delay = setTimeout(() => {
            getProfile();
        }, 500)
    }

    const getProfile = async () => {
        let rs = await DataService.getUserProfile({ userId: id });
        if (rs.code === 0) {
            rs.data.name = rs.data.firstName + " " + rs.data.lastName;
            setUserInfo(rs.data)
            setOpen(true)
        }
    }

    const hanldeMouseOver = () => {
        clearTimeout(hoverDelay)
    }

    const handleClose = (event) => {
        hoverDelay = setTimeout(() => {
            clearTimeout(delay)
            setOpen(false);
            setUserInfo(null);
        }, 200)

    };

    return (
        <React.Fragment>
            <Typography
                ref={mentionRef}
                className="username"
                style={{ fontSize: size == "large" ? 18 : 16 }}
                onClick={() => Router.push(`/profile/${id}`)}
                onMouseOver={handleToggleMention}
                onMouseLeave={handleClose}
            >
                {name}
            </Typography>

            {
                userInfo ? (
                    <Popper style={{ zIndex: 20 }} onMouseOver={hanldeMouseOver} onMouseLeave={handleClose} open={open} anchorEl={mentionRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <UserInfoTooltip style={{ width: "auto" }} user={userInfo} />
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                ) : null
            }

        </React.Fragment >

    )

}
export default CustomUserName;