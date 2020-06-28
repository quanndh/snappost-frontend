import React, { useState, useEffect } from 'react';
import { Paper, Avatar, Button, IconButton } from '@material-ui/core';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import SharePostModal from '../SharePostModal/SharePostModal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import EditPostModal from '../EditPostModal/EditPostModal';

const Post = (props) => {

    const { data, user, sharing } = props;

    if (!data) {
        return (
            <div className="post-container">
                <div className="post-text" style={{ display: 'flex', alignItems: 'center' }}>
                    This post is not exist anymore  <SentimentVeryDissatisfiedIcon />
                </div>
            </div>
        )
    }

    const [deleteModal, setDeleteModal] = useState(false)
    const [loadMoreComment, setLoadMoreComment] = useState(false)
    const [isLike, setIsLike] = useState(data.isLike);
    const [showComment, setShowComment] = useState(false);
    const [loadComment, setLoadComment] = useState(true);
    const [showShare, setShowShare] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const toggleLike = async () => {
        setIsLike(!isLike)
        ApiService.toggleLikePost({ postId: data.id, like: !isLike })
        await DataService.toggleLikePost({ postId: data.id })
    }

    useEffect(() => {
        handleShowComment()
    }, [loadMoreComment])

    const handleShowComment = async () => {
        if (loadMoreComment) {
            setShowComment(true)
            setLoadComment(true)
            let rs = await DataService.getParentComment({
                postId: data.id,
                skip: data?.comments.length,
                limit: 10
            });
            setLoadComment(false)
            setLoadMoreComment(false)
            ApiService.setCommentForPost({ postId: data.id, data: rs.data })
        }
    }

    const handleDeletePost = async () => {
        let rs = await DataService.deletePost({ id: data.id })
        ApiService.deletePost({ postId: data.id })
        Helper.activateToast("default", rs.message)
    }

    return (
        <>
            <EditPostModal data={data} user={user} open={showEdit} handleClose={() => setShowEdit(false)} />
            <Dialog
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">This post will be deleted ?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteModal(false)} color="secondary">
                        Cancel
                     </Button>
                    <Button onClick={handleDeletePost} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <SharePostModal user={user} open={showShare} sharedPost={data} handleClose={() => setShowShare(false)} />
            <Paper elevation={3} className="post-container">
                <div className="post-header">
                    <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: 'flex' }}>
                            <Avatar className="avatar" src={data.postBy.avatar} />
                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "space-around" }}>
                                <Username size="large" name={data.postBy.firstName + " " + data.postBy.lastName} id={data.postBy.id} />
                                <p style={{ marginTop: 8 }}>{Helper.formatCreatedTime(data.created_at)}</p>
                            </div>
                        </div>
                        {
                            !sharing ? (
                                <div>
                                    <CustomTooltip title="Edit">
                                        <IconButton
                                            onClick={() => setShowEdit(true)} >
                                            <EditIcon />
                                        </IconButton>
                                    </CustomTooltip>

                                    <CustomTooltip title="Delete">
                                        <IconButton
                                            onClick={() => setDeleteModal(true)}
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </CustomTooltip>

                                </div>
                            ) : null
                        }

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

                {
                    data?.isShared ? <Post data={data.sharedPost} user={user} sharing={true} /> : null
                }

                {
                    !sharing ? (
                        <>
                            {
                                data.totalLike == 0 && data.totalComment == 0 && data.totalShare == 0 ? null : (
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
                                )
                            }

                            <div className="post-action">
                                <div className="primary-button" onClick={toggleLike}>
                                    {
                                        isLike ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />
                                    }
                                    <span className={classNames({ "like": isLike })}>Like</span>
                                </div>
                                <div className="primary-button" onClick={() => setLoadMoreComment(true)}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                    <span>Comment</span>
                                </div>
                                <div className="primary-button" onClick={() => setShowShare(true)}>
                                    <ShareOutlinedIcon />
                                    <span>Resnap</span>
                                </div>
                            </div>
                            {
                                showComment && (
                                    <div className="post-comment-container">
                                        {
                                            (data.totalComment - data.totalReplyComment) > data.comments.length ? (
                                                <div className="more">
                                                    <span onClick={() => setLoadMoreComment(true)}>Read {(data.totalComment - data.totalReplyComment) - data.comments.length} more {(data.totalComment - data.totalReplyComment) - data.comments.length > 1 ? "comments" : "comment"}</span>
                                                </div>
                                            ) : null
                                        }
                                        {
                                            loadComment ? (
                                                <div style={{ width: '100%', display: 'flex', justifyContent: "center" }}>
                                                    <CircularProgress />
                                                </div>
                                            ) : null
                                        }
                                        <>
                                            {
                                                data?.comments?.length > 0 ? (
                                                    data.comments.map(comment => {
                                                        return <CommentParent user={user} postId={data.id} key={"comment" + comment.id} data={comment} />
                                                    })
                                                ) : null
                                            }
                                            <CommentInput user={user} postId={data.id} />
                                        </>
                                    </div>
                                )
                            }
                        </>
                    ) : null
                }

            </Paper>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}


export default connect(mapStateToProps)(Post);