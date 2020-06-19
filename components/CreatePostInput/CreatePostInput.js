import React, { useState, useMemo, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GifIcon from '@material-ui/icons/Gif';
import ReactHtmlParser from 'react-html-parser';
import { createEditor } from 'slate'
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

    const { user } = props;

    const { showCreatePost } = props;

    const editor = useRef(null)

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(() => EditorState.createWithContent(emptyContentState))
    const [markupContent, setMarkupContent] = useState("<p></p>");
    const [suggestions, setSuggestions] = useState([]);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [upLoadUrls, setUploadUrl] = useState([]);

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
        let newData = []
        if (e.target.files[0].type.includes("image")) {
            rs = await DataService.uploadImage({ data: e.target.files[0], type: "images" })
            let newImages = [];
            rs.data.map(item => {
                newImages.push(item)
                newData.push({
                    type: "image",
                    url: item.url,
                    id: item.id
                })
            })
            setImages([...images, ...newImages])
        } else {
            rs = await DataService.uploadVideo({ data: e.target.files[0], type: "files" })
            let newVideos = [];
            rs.data.map(item => {
                newVideos.push(item)
                newData.push({
                    type: "video",
                    url: item.url,
                    id: item.id,
                })
            })
            setVideos([...videos, ...newVideos])
        }
        setUploadUrl([...upLoadUrls, ...newData])
    }

    const handleRemoveImages = (index, removeFile) => {
        if (removeFile.type === "image") {
            let filterdImage = images.filter(image => image.id !== removeFile.id);
            setImages(filterdImage)
        } else {
            let filterdVideo = videos.filter(video => video.id !== removeFile.id);
            setVideos(filterdVideo)
        }
        setUploadUrl([...upLoadUrls.slice(0, index), ...upLoadUrls.slice(index + 1, upLoadUrls.length)])
    }

    const handleLoadMetadata = (e, index) => {
        let tempUpload = [...upLoadUrls];
        tempUpload[index].length = e.target.duration
        setUploadUrl(tempUpload)
    }

    const handleCreatePost = async () => {
        console.log(content.convertTo)
        setLoading(true)
        let data = {
            content: JSON.stringify(convertToRaw(content.getCurrentContent())),
            images,
            videos
        }
        let rs = await DataService.createPost(data)
        if (rs.code == 0) {
            setImages([])
            setVideos([])
            setUploadUrl([])
            setContent(() => EditorState.createWithContent(emptyContentState))
        }
        setLoading(false)
    }

    const { MentionSuggestions } = mentionPlugin;

    return (
        <>
            {loading && <LinearProgress />}
            <div style={{ position: 'relative', zIndex: showCreatePost ? 12 : 0 }} >
                <input
                    accept="*"
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
                                    // onAddMention={onAddMention}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        upLoadUrls.length > 0 && (
                            <div className="create-post-media">
                                {
                                    upLoadUrls.map((upLoad, index) => {
                                        return (
                                            <div className="create-post-media-item" key={upLoad.id}>
                                                {
                                                    upLoad.type === "image" ? (
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
                                                            onClick={() => handleRemoveImages(index, upLoad)}
                                                            className="create-post-media-item-close"
                                                        />
                                                    </CustomTooltip>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
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
                                    disabled={markupContent.trim() == "<p></p>" && upLoadUrls.length === 0}
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
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(CreatePostInput);