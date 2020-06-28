import React, { useState } from 'react';
import JsxParser from 'react-jsx-parser'
import Username from '../Username/Username';
import Helper from '../../services/Helper/helper';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { Paper, Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ApiService from '../../services/ApiService/ApiService';
import DataService from '../../network/DataService';
import CommentInput from '../CommentInput/CommentInput';
import CommentChild from '../CommentChild/CommentChild';
import { useEffect } from 'react';
import helper from '../../services/Helper/helper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const CommentParent = ({ data, postId, user }) => {

    const [isLike, setIsLike] = useState(data.isLike);
    const [showReply, setShowReply] = useState(false);
    const [loadMoreReply, setLoadMoreReply] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const toggleLike = async () => {
        setIsLike(!isLike)
        ApiService.toggleLikeComment({ postId, commentId: data.id, like: !isLike })
        await DataService.toggleLikeComment({ commentId: data.id })
    }

    useEffect(() => {
        handleShowReply()
    }, [loadMoreReply])

    const handleShowReply = async () => {
        if (loadMoreReply) {
            let rs = await DataService.getReplyComment({
                skip: data?.reply.length,
                limit: 10,
                postId,
                commentId: data.id,
            })
            setLoadMoreReply(false);
            ApiService.setReplyForComment({ postId, data: rs.data, parent: data.id })
            setShowReply(true);
        }
    }

    const handleDeleteComment = async () => {
        let rs = await DataService.deleteComment({ commentId: data.id })
        ApiService.deleteComment({ postId, commentId: data.id })
        helper.activateToast("default", rs.message)
    }

    return (
        <>
            <Dialog
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">This comment will be deleted ?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteModal(false)} color="secondary">
                        Cancel
                     </Button>
                    <Button onClick={handleDeleteComment} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="comment-container">
                <div className="comment">
                    <div style={{ width: "7%" }}>
                        <Avatar className="avatar" src={data.user.avatar} />
                    </div>
                    <div className="content">
                        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 8 }}>
                            <Username name={data.user.firstName + " " + data.user.lastName} id={data.user.id} />
                            <span style={{ marginLeft: 8 }}>{Helper.formatCreatedTime(data.created_at)}</span>
                        </div>
                        <div className="text">
                            <JsxParser
                                bindings={{}}
                                components={{ Username }}
                                jsx={Helper.formatMention(data?.content, data?.mentions)}
                            />

                            {
                                data?.totalLike > 0 && (
                                    <Paper className="like-count">
                                        <ThumbUpIcon color="primary" style={{ fontSize: 14, marginRight: 4 }} />{data.totalLike}
                                    </Paper>
                                )
                            }

                        </div>
                        {
                            data.upload.length > 0 ? (
                                <div className="media">
                                    {
                                        data.upload[0].fileType.includes("image") ? (
                                            <img src={data.upload[0].url} />
                                        ) : (
                                                <video controls>
                                                    <source src={data.upload[0].url} />
                                                </video>
                                            )
                                    }
                                </div>
                            ) : null
                        }

                    </div>
                </div>
                <div className="comment-action">
                    <div onClick={toggleLike} >
                        <span className={classNames({ "like": isLike })}>Like</span>
                    </div>
                    <div onClick={() => setLoadMoreReply(true)} >
                        <span className="like">{data?.totalReply > 0 ? `${data.totalReply} Replies` : "Reply"}</span>
                    </div>
                    <div onClick={() => setDeleteModal(true)} >
                        <span>Delete</span>
                    </div>
                </div>
                <div className="comment-reply-container">
                    {
                        showReply && data.totalReply > data.reply.length ? (
                            <div className="more">
                                <span onClick={() => setLoadMoreReply(true)}>Read {data.totalReply - data.reply.length} more {data.totalReply - data.reply.length > 1 ? "replies" : "reply"} </span>
                            </div>
                        ) : null
                    }
                    {
                        data?.reply && showReply ? data.reply.map(r => {
                            return (
                                <CommentChild key={"reply" + r.id} data={r} postId={postId} user={user} />
                            )
                        }) : null
                    }

                    {
                        showReply && <CommentInput commentId={data.id} user={user} postId={postId} />
                    }
                </div>
            </div >
        </>
    )
}

export default CommentParent;