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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import helper from '../../services/Helper/helper';

const CommentChild = ({ data, postId, user }) => {

    const [isLike, setIsLike] = useState(data.isLike);
    const [deleteModal, setDeleteModal] = useState(false)

    const toggleLike = async () => {
        setIsLike(!isLike)
        ApiService.toggleLikeReply({ postId, like: !isLike, parent: data.parent, replyId: data.id })
        await DataService.toggleLikeComment({ commentId: data.id })
    }

    const handleDeleteComment = async () => {
        let rs = await DataService.deleteComment({ commentId: data.id })
        ApiService.deleteCommentChild({ postId, commentId: data.id, parent: data.parent })
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
                <DialogTitle id="alert-dialog-title">This reply will be deleted ?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteModal(false)} color="secondary">
                        Cancel
                     </Button>
                    <Button onClick={handleDeleteComment} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
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
                <div onClick={() => setDeleteModal(true)} >
                    <span>Delete</span>
                </div>
            </div>
        </>

    )
}

export default CommentChild;