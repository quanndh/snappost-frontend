import React, { useEffect, useState } from 'react';
import { Paper, Avatar, Typography, Button, Link } from '@material-ui/core';
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
import { connect } from 'react-redux';
import CommentInput from '../CommentInput/CommentInput'
import DataService from '../../network/DataService';
import ApiService from '../../services/ApiService/ApiService';
import CommentParent from '../CommentParent/CommentParent';

const Post = (props) => {

    const { data, user } = props;

    const [isLike, setIsLike] = useState(data.isLike);
    const [showComment, setShowComment] = useState(false);

    const toggleLike = async () => {
        setIsLike(!isLike)
        let rs = await DataService.toggleLikePost({ postId: data.id })
        ApiService.toggleLikePost({ postId: data.id, like: !isLike })
    }

    const handleShowComment = async () => {
        if (!showComment) {
            let rs = await DataService.getParentComment({
                postId: data.id,
                skip: data?.comments.length,
                limit: 3
            });
            ApiService.setCommentForPost({ postId: data.id, data: rs.data })
            setShowComment(true)
        } else {
            setShowComment(false)
        }
    }

    if (!data) {
        return null;
    }

    return (
        <Paper elevation={0} className="post-container">
            <div className="post-header">
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: 'flex' }}>
                        <Avatar className="avatar" src={data.postBy.avatar} />
                        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "space-around" }}>
                            <Username size="large" name={data.postBy.firstName + " " + data.postBy.lastName} id={data.postBy.id} />
                            <p style={{ marginTop: 8 }}>{Helper.formatCreatedTime(data.created_at)}</p>
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

            {
                data?.upload.length > 0 ? (
                    <div className="post-media">
                        <ImageGallery upload={data?.upload} startCount={5} />
                    </div>
                ) : null
            }

            <div className="post-info">
                <div className="post-info-item">
                    {
                        data.totalLike > 0 && (
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <ThumbUpIcon color="primary" />
                                <span>{data.totalLike}</span>
                            </div>
                        )
                    }
                </div>
                <div className="post-info-item">
                    {
                        data?.totalComment > 0 ? <span>{data.totalComment} comments</span> : null
                    }
                    {
                        data?.totalShare > 0 ? <span>{data.totalShare} shares</span> : null
                    }
                </div>
            </div>
            <div className="post-action">
                <div className="primary-button" onClick={toggleLike}>
                    {
                        isLike ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />
                    }
                    <span className={classNames({ "like": isLike })}>Like</span>
                </div>
                <div className="primary-button" onClick={handleShowComment}>
                    <ChatBubbleOutlineOutlinedIcon />
                    <span>Comment</span>
                </div>
                <div className="primary-button">
                    <ShareOutlinedIcon />
                    <span>Resnap</span>
                </div>
            </div>
            {
                showComment && (
                    <div className="post-comment-container">
                        {
                            data?.comments?.length && showComment > 0 ? (
                                data.comments.map(comment => {
                                    return <CommentParent user={user} postId={data.id} key={"comment" + comment.id} data={comment} />
                                })
                            ) : null
                        }
                        <CommentInput user={user} postId={data.id} />
                    </div>
                )
            }
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}


export default connect(mapStateToProps)(Post);