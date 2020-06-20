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
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import Username from '../Username/Username';
import { convertToRaw, convertFromRaw } from 'draft-js';
import JsxParser from 'react-jsx-parser'

const mentionPlugin = createMentionPlugin({
    mentionComponent: (mentionProps) => (
        <CustomUserName mentionProps={mentionProps} />
    ),
});

const linkifyPlugin = createLinkifyPlugin();

let plugins = [mentionPlugin, linkifyPlugin]

const Post = (props) => {

    const [value, setValue] = useState("");
    const [isLike, setIsLike] = useState(false)

    const { data } = props;

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
                        <div>
                            <Typography className="username">Quân Nguyễn</Typography>
                            <p>23 hours ago</p>
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
                <ImageGallery images={data?.images} startCount={5} />
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
        </Paper>
    )
}


export default Post;