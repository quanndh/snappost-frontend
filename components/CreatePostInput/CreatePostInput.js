import React, { useState, useMemo, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GifIcon from '@material-ui/icons/Gif';
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
import { convertToRaw, convertFromRaw } from 'draft-js';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

const emptyContentState = convertFromRaw({
    entityMap: {},
    blocks: [
        {
            text: '',
            key: 'foo',
            type: 'unstyled',
            entityRanges: [],
        },
    ],
});

const mentionPlugin = createMentionPlugin({
    mentionComponent: (mentionProps) => (
        <CustomUserName mentionProps={mentionProps} />
    ),
});

const linkifyPlugin = createLinkifyPlugin();

let plugins = [mentionPlugin, linkifyPlugin]

const CreatePostInput = (props) => {

    const { showCreatePost, createPostUploadPercent, user } = props;

    const editor = useRef(null)

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(() => EditorState.createWithContent(emptyContentState))
    const [markupContent, setMarkupContent] = useState("<p></p>");
    const [mentions, setMentions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [upload, setUpload] = useState([]);

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
            ApiService.toggleCreatePost()
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

    const handleCreatePost = async () => {
        setLoading(true)
        let data = {
            content: markupContent,
            upload,
            mentions
        }
        let rs = await DataService.createPost(data)
        if (rs.code == 0) {
            setUpload([])
            setMarkupContent("<p></p>")
            setContent(() => EditorState.createWithContent(emptyContentState))
        }
        ApiService.setCreatePostUploadPercent(0)
        setLoading(false)
    }

    const onAddMention = (e) => {
        setMentions([...mentions, e])
    }

    const { MentionSuggestions } = mentionPlugin;

    return (
        <>
            {loading && <LinearProgress />}
            <div style={{ position: 'relative', zIndex: showCreatePost ? 12 : 0 }} >
                <input
                    accept="image/*,video/*"
                    style={{ display: "none" }}
                    id="upload"
                    multiple
                    type="file"
                    onChange={hanldeUpload}
                />
                <div className="create-post-container" onClick={handleOpenCreate}>
                    <div className="create-post-body">
                        <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>

                            <Avatar alt={user.firstName} src={user.avatar} className="avatar" />

                            <div className="create-post-text" style={{ width: "80%" }}>
                                <div onClick={focus}>
                                    <Editor
                                        readOnly={!showCreatePost}
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
                    <div className="create-post-media">
                        {
                            upload.length > 0 && upload.map((upLoad, index) => {
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

                    <div className="create-post-option">
                        <label htmlFor="upload">
                            <div className="create-post-option-item">
                                <ImageIcon />
                                <span>Video/Image</span>
                            </div>
                        </label>

                        <div className="create-post-option-item">
                            <AssignmentIndIcon />
                            <span>Tag friend</span>
                        </div>
                        <div className="create-post-option-item">
                            <GifIcon style={{ fontSize: 44 }} />
                            <span>Import GIF</span>
                        </div>
                    </div>
                    {
                        showCreatePost && (
                            <div style={{ margin: "0 16px", width: "95%", marginBottom: 20, marginTop: 20 }}>
                                <Button
                                    color="primary"
                                    disabled={markupContent.trim() == "<p></p>" && upload.length === 0}
                                    style={{ width: "100%", }}
                                    variant="contained"
                                    onClick={handleCreatePost}
                                >
                                    Snap
                            </Button>
                            </div>
                        )
                    }
                </div>
            </ div >
        </>

    )
}

const mapStateToProps = state => {
    return {
        showCreatePost: state.uiReducer.showCreatePost,
        user: state.userReducer.user,
        createPostUploadPercent: state.uploadReducer.createPostUploadPercent
    }
}

export default connect(mapStateToProps)(CreatePostInput);