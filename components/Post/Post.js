import React, { useEffect, useState } from 'react';
import { Paper, Avatar, Typography, Button, Link } from '@material-ui/core';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Helper from '../../services/Helper/helper';
import ImageGallery from '../ImageGallery';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import classNames from 'classnames';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import Username from '../Username/Username';
import JsxParser from 'react-jsx-parser'
import helper from '../../services/Helper/helper';
import { connect } from 'react-redux';
import CommentInput from '../CommentInput/CommentInput'

const Post = (props) => {

    const [isLike, setIsLike] = useState(false);
    const [showComment, setShowComment] = useState(false);

    const { data, user } = props;

    useEffect(() => {

    }, [])

    const change = () => {

    }

    const toggleLike = () => {
        setIsLike(!isLike)
    }

    return (
        <Paper elevation={0} className="post-container">
            <div className="post-header">
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: 'flex' }}>
                        <AccountCircleSharpIcon className="avatar" color="disabled" />
                        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "space-around" }}>
                            <Username size="large" name={data.postBy.firstName + " " + data.postBy.lastName} id={data.postBy.id} />
                            <p>{helper.formatCreatedTime(data.created_at)}</p>
                        </div>
                    </div>
                    <MoreVertIcon />
                </div>

                <div className="post-text">
                    <JsxParser
                        bindings={{}}
                        components={{ Username }}
                        jsx={Helper.formatMention(data?.content, data?.mentions)}
                    />
                </div>
            </div>

            <div className="post-media">
                <ImageGallery upload={data?.upload} startCount={5} />
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
                <div className="primary-button" onClick={toggleLike}>
                    {
                        isLike ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />
                    }
                    <span className={classNames({ "like": isLike })}>Like</span>
                </div>
                <div className="primary-button">
                    <ChatBubbleOutlineOutlinedIcon />
                    <span>Comment</span>
                </div>
                <div className="primary-button">
                    <ShareOutlinedIcon />
                    <span>Resnap</span>
                </div>
            </div>

            <div className="post-comment-container">
                <CommentInput user={user} />
            </div>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}


export default connect(mapStateToProps)(Post);