import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CustomTooltip from '../../components/CustomTooltip/CustomTooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VideocamIcon from '@material-ui/icons/Videocam';
import { Paper } from '@material-ui/core';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const People = (props) => {
    const [showVideo, setShowVideo] = useState(false);

    const { item } = props;

    return (
        <ListItem
            onMouseOver={() => {
                setShowVideo(true)
            }}
            onMouseLeave={() => {
                setShowVideo(false)
            }}
            className="contact-bar-people-item"
        >
            <ListItemAvatar>
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    {
                        item.avatar ? (
                            <Avatar alt={item.name} src={item.avatar} className="chat-avatar" />
                        ) : (
                                <AccountCircleSharpIcon color="disabled" className="chat-avatar" />
                            )
                    }
                </StyledBadge>
            </ListItemAvatar>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction style={{ display: showVideo ? "block" : "none" }}>
                <CustomTooltip title="Video call">
                    <IconButton edge="end">
                        <VideocamIcon />
                    </IconButton>
                </CustomTooltip>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const ContactBar = () => {

    const data = [
        { name: "quan" },
        { name: "Bach" },
        { name: "Bach" },
        { name: "Bach" },
        { name: "Bach" },
        { name: "Bach" },
        { name: "Bach" },
        { name: "Bach" },
        { name: "quan" },
        { name: "quan" },
        { name: "quan" },
        { name: "quan" },
        { name: "quan" },
        { name: "quan" },
        { name: "quan" },
        { name: "quan" },
        { name: "Nghia" },
        { name: "Nghia" },
        { name: "Nghia" },
        { name: "Nghia" },
        { name: "Nghia" },
        { name: "Nghia" },
        { name: "Nghia" },
        { name: "Nghia" },
        { name: "Nghia" },
        { name: "Nghia" },
        { name: "Nghia" },
    ]

    let renderListContact = data.length ? (data.map((item, index) => {
        return (
            <People item={item} key={index} />
        )
    })) : null

    return (
        <Paper className="contact-bar-container" id="contactBar">
            <List className="contact-bar-people">
                {
                    renderListContact
                }
            </List>
            <Paper elevation={0} className="contact-bar-searchbox" >
                <IconButton style={{ padding: 10 }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    style={{ marginLeft: 10, flex: 1 }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <CustomTooltip title="Create new group">
                    <IconButton style={{ padding: 10 }} aria-label="directions">
                        <GroupAddIcon />
                    </IconButton>
                </CustomTooltip>
            </Paper>
        </Paper>
    )
}

export default ContactBar;