import React, { useEffect, useState } from 'react';
import { Paper, Avatar, Typography, Button, Link } from '@material-ui/core';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactHtmlParser from 'react-html-parser';
import Helper from '../../services/Helper/helper';
import ImageGallery from '../ImageGallery';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import classNames from 'classnames';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

let images = [
    // "https://picsum.photos/id/1/200/300",
    // "https://picsum.photos/id/2/200/300",
    // "https://picsum.photos/id/3/200/300",
    // "https://picsum.photos/id/4/200/300",
    "https://picsum.photos/id/5/200/300",
    "https://picsum.photos/id/6/200/300",
    "https://picsum.photos/id/7/200/300",
    "https://picsum.photos/id/8/200/300",
]

const Post = (props) => {

    const [value, setValue] = useState("");
    const [isLike, setIsLike] = useState(false)

    useEffect(() => {

    }, [])

    const toggleLike = () => {
        setIsLike(!isLike)
    }

    return (
        <Paper elevation={0} className="post-container">
            <div className="post-header">
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: 'flex' }}>
                        <AccountCircleSharpIcon className="avatar" color="disabled" />
                        <div>
                            <Typography className="username">Quân Nguyễn</Typography>
                            <p>23 hours ago</p>
                        </div>
                    </div>
                    <MoreVertIcon />
                </div>

                <div className="post-text">
                    {/* {ReactHtmlParser(Helper.jsonToHtml(value || []))} */}
                </div>
            </div>

            <div className="post-media">
                <ImageGallery images={images} startCount={5} />
            </div>
            <div className="post-info">
                <div className="post-info-item">
                    <ThumbUpIcon color="primary" />
                    <span>4 likes</span>
                </div>
                <div className="post-info-item">
                    <span>100 comments</span>
                    <span>100 shares</span>
                </div>
            </div>
            <div className="post-action">
                <div className="post-action-button" onClick={toggleLike}>
                    {
                        isLike ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />
                    }
                    <span className={classNames({ "like": isLike })}>Like</span>
                </div>
                <div className="post-action-button">
                    <ChatBubbleOutlineOutlinedIcon />
                    <span>Comment</span>
                </div>
                <div className="post-action-button">
                    <ShareOutlinedIcon />
                    <span>Resnap</span>
                </div>
            </div>
        </Paper>
    )
}


export default Post;