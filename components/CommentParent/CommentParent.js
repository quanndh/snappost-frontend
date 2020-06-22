import React, { useState } from 'react';
import JsxParser from 'react-jsx-parser'
import Username from '../Username/Username';
import Helper from '../../services/Helper/helper';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ApiService from '../../services/ApiService/ApiService';

const CommentParent = ({ data, postId }) => {

    const [isLike, setIsLike] = useState(false);

    const toggleLike = () => {
        setIsLike(!isLike)
        ApiService.toggleLikeComment({ postId, commentId: data.id, like: !isLike })
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
            </div>
        </div >
    )
}

export default CommentParent;