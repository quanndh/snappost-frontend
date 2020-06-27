import React, { useState, useRef } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Helper from '../../services/Helper/helper';
import { connect } from 'react-redux'
import ApiService from '../../services/ApiService/ApiService';
import DataService from '../../network/DataService';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import CustomUserName from '../CustomUserName/CustomUserName';
import CloseIcon from '@material-ui/icons/Close';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import draftToHtml from 'draftjs-to-html';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { convertToRaw } from 'draft-js';
import { stateFromHTML } from "draft-js-import-html"
import helper from "../../services/Helper/helper";
import Post from "../Post/Post";

const mentionPlugin = createMentionPlugin({
    mentionComponent: (mentionProps) => (
        <CustomUserName mentionProps={mentionProps} />
    ),
});

const linkifyPlugin = createLinkifyPlugin();

let plugins = [mentionPlugin, linkifyPlugin]

const EditPostModal = ({ handleClose, user, open, data, createPostUploadPercent }) => {
    const editor = useRef(null)

    let contentState = stateFromHTML(data.content);

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(EditorState.createWithContent(contentState))
    const [markupContent, setMarkupContent] = useState(data.content);
    const [mentions, setMentions] = useState(data.mentions);
    const [suggestions, setSuggestions] = useState([]);
    const [upload, setUpload] = useState(data.upload);
    const [showCreatePost, setShowCreatePost] = useState(false);

    const focus = () => {
        editor.current.focus();
    };

    const onSearchChange = ({ value }) => {
        if (value) {
            setTimeout(async () => {
                let rs = await DataService.findTagFriend({ name: value });
                let data = [];
                rs.data.map(item => {
                    data.push({
                        id: item.id,
                        name: item.firstName + " " + item.lastName,
                        avatar: item.avatar,
                        wallImage: item.wallImage
                    })
                })
                setSuggestions(data)
            }, 200)
        }
    };

    const onChange = (editorState) => {
        let markup = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
        )
        setMarkupContent(markup)
        setContent(editorState)
    };

    const handleOpenCreate = () => {
        if (!showCreatePost) {
            setShowCreatePost(true)
        }
    }

    const hanldeUpload = async (e) => {
        let rs;
        setLoading(true)
        if (e.target.files[0].type.includes("image")) {
            rs = await DataService.uploadImage({ data: e.target.files[0], type: "images" })
        } else {
            rs = await DataService.uploadVideo({ data: e.target.files[0], type: "files" })
        }
        ApiService.setCreatePostUploadPercent(0)
        setLoading(false)
        setUpload([...upload, ...rs.data])
    }

    const handleRemoveImages = (index) => {
        setUpload([...upload.slice(0, index), ...upload.slice(index + 1, upload.length)])
    }

    const handleLoadMetadata = (e, index) => {
        let tempUpload = [...upload];
        tempUpload[index].length = e.target.duration
        setUpload(tempUpload)
    }

    const onAddMention = (e) => {
        setMentions([...mentions, e])
    }

    const handleUpdatePost = async () => {
        let rs = await DataService.updatePost({ postId: data.id, content: markupContent, upload, mentions })
        if (rs.code == 0) {
            ApiService.updatePost({ data: rs.data, postId: data.id })
            helper.activateToast('default', rs.message)
            handleClose()
        }
    }

    const { MentionSuggestions } = mentionPlugin;

    return (
        <Dialog style={{ zIndex: 1000 }} maxWidth="md" fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <div style={{ position: 'relative', zIndex: 12 }} >
                    <input
                        accept="image/*,video/*"
                        style={{ display: "none" }}
                        id="edit-upload"
                        multiple
                        type="file"
                        onChange={hanldeUpload}
                    />
                    <div className="create-post-container" onClick={handleOpenCreate}>
                        <div className="create-post-body" style={{ marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>

                                <Avatar alt={user.firstName} src={user.avatar} className="avatar" />

                                <div className="create-post-text" style={{ width: "80%" }}>
                                    <div onClick={focus}>
                                        <Editor
                                            readOnly={false}
                                            editorState={content}
                                            onChange={onChange}
                                            plugins={plugins}
                                            ref={editor}
                                            placeholder={'Snap your feeling here...'}
                                        />
                                        <MentionSuggestions
                                            onSearchChange={onSearchChange}
                                            suggestions={suggestions}
                                            onAddMention={onAddMention}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            data.isShared ? (
                                <div style={{ padding: 12, margin: "0 32px", borderLeft: "5px solid #dddfe2" }}>
                                    <Post data={data.sharedPost} user={user} sharing={true} />
                                </div>
                            ) : null
                        }

                        {
                            upload.length > 0 ? (
                                <div className="create-post-media">
                                    {
                                        upload.map((upLoad, index) => {
                                            return (
                                                <div className="create-post-media-item" key={upLoad.id}>
                                                    {
                                                        upLoad.fileType.includes("image") ? (
                                                            <img src={upLoad.url} />
                                                        ) : (
                                                                <>
                                                                    <video src={upLoad.url} onLoadedMetadata={(e) => handleLoadMetadata(e, index)} />
                                                                </>
                                                            )
                                                    }
                                                    {upLoad.length && (
                                                        <div className="duration">
                                                            <span style={{ color: "white" }}>{Helper.formatSecond(upLoad.length)}</span>
                                                        </div>
                                                    )}

                                                    <div className="overlay">
                                                        <CustomTooltip theme="dark" title="Remove">
                                                            <CloseIcon
                                                                onClick={() => handleRemoveImages(index)}
                                                                className="create-post-media-item-close"
                                                            />
                                                        </CustomTooltip>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        loading && (
                                            <div className="loading">
                                                <CircularProgress style={{ color: "white" }} variant="static" value={createPostUploadPercent} />
                                            </div>
                                        )
                                    }
                                </div>
                            ) : null
                        }

                        {
                            !data.isShared ? (
                                <div className="create-post-option">
                                    <label htmlFor="edit-upload">
                                        <div className="create-post-option-item">
                                            <ImageIcon />
                                            <span>Video/Image</span>
                                        </div>
                                    </label>
                                </div>
                            ) : null
                        }


                        <div style={{ margin: "0 16px", width: "95%", marginBottom: 20, marginTop: 20 }}>
                            <Button
                                color="primary"
                                disabled={markupContent.trim() == "<p></p>" && upload.length === 0}
                                style={{ width: "100%", }}
                                variant="contained"
                                onClick={handleUpdatePost}
                            >
                                Save
                            </Button>
                        </div>

                    </div>
                </ div >
            </DialogContent>
        </Dialog>
    )
}

const mapStateToProps = state => {
    return {
        createPostUploadPercent: state.uploadReducer.createPostUploadPercent
    }
}

export default connect(mapStateToProps)(EditPostModal);