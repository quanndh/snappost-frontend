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

const CommentChild = ({ data, postId, user }) => {
    const [isLike, setIsLike] = useState(data.isLike);

    const toggleLike = async () => {
        setIsLike(!isLike)
        ApiService.toggleLikeReply({ postId, like: !isLike, parent: data.parent, replyId: data.id })
        await DataService.toggleLikeComment({ commentId: data.id })
    }

    return (
        <>
            <div className="comment" key={"reply" + data.id}>
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
        </>

    )
}

export default CommentChild;