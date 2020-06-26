import React, { useState } from 'react';
import UserInfoTooltip from '../UserInfoTooltip/UserInfoTooltip';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import { Paper } from '@material-ui/core';
import DataService from '../../network/DataService';
import Router from 'next/router';;

const CustomUserName = props => {
    let { name, id, size } = props;

    const [open, setOpen] = React.useState(false);
    const mentionRef = React.useRef(null);
    const [userInfo, setUserInfo] = useState({})

    let delay;

    const handleToggleMention = async () => {
        delay = setTimeout(() => {
            getProfile();
        }, 100)
    }

    const getProfile = async () => {
        let rs = await DataService.getUserProfile({ userId: id });
        if (rs.code === 0) {
            rs.data.name = rs.data.firstName + " " + rs.data.lastName;
            setUserInfo(rs.data)
            setOpen(true)
        }
    }

    const handleClose = (event) => {
        clearTimeout(delay)
        setOpen(false);
        setUserInfo(null);
    };

    return (
        <React.Fragment>
            <span
                ref={mentionRef}
                className="username"
                style={{ fontSize: size == "large" ? 20 : 16 }}
                onClick={() => Router.push(`/profile/${id}`)}
                onMouseOver={handleToggleMention}
                onMouseLeave={handleClose}
            >
                {name}
            </span>


            <Popper style={{ zIndex: 20 }} onMouseLeave={handleClose} open={open} anchorEl={mentionRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <div>
                            <UserInfoTooltip style={{ width: "auto" }} user={userInfo} />
                        </div>
                    </Grow>
                )}
            </Popper>



        </React.Fragment >

    )

}
export default CustomUserName;