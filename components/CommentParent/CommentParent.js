import React, { useState } from 'react';
import JsxParser from 'react-jsx-parser'
import Username from '../Username/Username';
import Helper from '../../services/Helper/helper';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ApiService from '../../services/ApiService/ApiService';
import DataService from '../../network/DataService';
import CommentInput from '../CommentInput/CommentInput';
import CommentChild from '../CommentChild/CommentChild';

const CommentParent = ({ data, postId, user }) => {

    const [isLike, setIsLike] = useState(data.isLike);
    const [showReply, setShowReply] = useState(false);

    const toggleLike = async () => {
        setIsLike(!isLike)
        ApiService.toggleLikeComment({ postId, commentId: data.id, like: !isLike })
        await DataService.toggleLikeComment({ commentId: data.id })
    }

    const handleShowReply = async () => {
        if (!showReply) {
            let rs = await DataService.getReplyComment({
                skip: data?.reply.length,
                limit: 8,
                postId,
                commentId: data.id,
            })
            ApiService.setReplyForComment({ postId, data: rs.data, parent: data.id })
            setShowReply(true);
        } else {
            setShowReply(false);
        }
    }

    return (
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
                </div>
            </div>
            <div className="comment-action">
                <div onClick={toggleLike} >
                    <span className={classNames({ "like": isLike })}>Like</span>
                </div>
                <div onClick={handleShowReply} >
                    <span className="like">{data?.totalReply > 0 ? `${data.totalReply} Replies` : "Reply"}</span>
                </div>
            </div>
            <div className="comment-reply-container">
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
    )
}

export default CommentParent;