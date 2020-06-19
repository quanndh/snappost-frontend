import React from 'react';
import UserInfoTooltip from '../UserInfoTooltip/UserInfoTooltip';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import { Paper } from '@material-ui/core';
import DataService from '../../network/DataService';

const CustomUserName = props => {
    let { mentionProps } = props;

    const [open, setOpen] = React.useState(false);
    const mentionRef = React.useRef(null);

    const handleToggleMention = () => {
        setOpen((prevOpen) => !prevOpen);
        if (open) {
            setOpen((prevOpen) => !prevOpen);
        }
    };

    const handleClose = (event) => {
        if (mentionRef.current && mentionRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            mentionRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <span
                ref={mentionRef}
                className={mentionProps.className}
                onClick={() => alert('Clicked on the Mention!')}
                onMouseOver={handleToggleMention}
                onMouseLeave={handleClose}
            >
                {mentionProps.children}
            </span>

            <Popper style={{ zIndex: 20 }} onMouseLeave={handleClose} open={open} anchorEl={mentionRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <UserInfoTooltip style={{ width: "auto" }} user={mentionProps.mention} />
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>

    )
}

export default CustomUserName;