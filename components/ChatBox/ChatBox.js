import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { Typography, ClickAwayListener } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import VideocamIcon from '@material-ui/icons/Videocam';
import InputBase from '@material-ui/core/InputBase';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import Emoji from "react-emoji-render";
import { Picker } from 'emoji-mart'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';

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

const ChatBox = (props) => {

    let [open, setOpen] = useState(true);
    const [openEmoji, setOpenEmoji] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [message, setMessage] = useState("");

    const addEmoji = (emojiObject) => {
        // setChosenEmoji(emojiObject);
        setMessage(message + emojiObject.native)
        console.log(emojiObject)
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    let item = {}

    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <Paper elevation={3} className="chatBox" style={{ height: open ? 450 : 74 }}>
            <div className="chatBox-header" onClick={toggleOpen}>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <StyledBadge
                        style={{ marginLeft: 10, marginRight: 10 }}
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                    >
                        {
                            item.avatar ? (
                                <Avatar alt={item.name} src={item.avatar} className="avatar" />
                            ) : (
                                    <AccountCircleSharpIcon color="disabled" className="avatar" />
                                )
                        }
                    </StyledBadge>
                    <Typography variant="h6">
                        <b>quan Nguyen</b>
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {
                        open && (
                            <CustomTooltip title="Video call">
                                <VideocamIcon className="icon-button" color="disabled" style={{ fontSize: 24 }} />
                            </CustomTooltip>
                        )
                    }
                    <CustomTooltip title="Close" >
                        <CloseIcon color="disabled" className="icon-button" style={{ fontSize: 24 }} />
                    </CustomTooltip>
                </div>
            </div>
            {
                open && (
                    <>
                        <div className="chatBox-body">
                            <Emoji text={message} />

                        </div>
                        <div className="chatBox-input">
                            <InputBase
                                // multiline={true}
                                onChange={handleChange}
                                value={message}
                                style={{ padding: "0 10px", width: "100%", height: 50 }}
                                placeholder="Type message ..."
                            />
                            <div style={{ height: 50, padding: "0 10px", position: 'relative', display: 'flex', justifyContent: "space-between" }}>
                                <div>
                                    <CustomTooltip title="Upload file">
                                        <AttachFileIcon color="disabled" className="icon-button" />
                                    </CustomTooltip>

                                    <CustomTooltip title="Upload image">
                                        <ImageIcon color="disabled" className="icon-button" />
                                    </CustomTooltip>

                                    <CustomTooltip title="Emoji">
                                        <EmojiEmotionsIcon
                                            className="icon-button"
                                            color="disabled"
                                            onClick={() => { setOpenEmoji(!openEmoji) }}
                                        />
                                    </CustomTooltip>

                                    {
                                        openEmoji && (
                                            <ClickAwayListener onClickAway={() => { setOpenEmoji(!openEmoji) }}>
                                                <Picker
                                                    color="#1e88e5"
                                                    set='facebook'
                                                    style={{ position: 'absolute', bottom: 50, left: 70, zIndex: 10 }}
                                                    onSelect={addEmoji}
                                                    title='Pick your emoji…'
                                                    emoji='point_up'
                                                    i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }}
                                                />
                                            </ClickAwayListener>
                                        )
                                    }
                                </div>
                                <div>
                                    <CustomTooltip title="Send">
                                        <SendIcon className="icon-button" color={message.trim() === "" ? "disabled" : "primary"} />
                                    </CustomTooltip>
                                </div>

                            </div>
                        </div>
                    </>
                )
            }
        </Paper >
    )
}

export default ChatBox;