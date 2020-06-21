import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
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
import { convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import CloseIcon from '@material-ui/icons/Close';
import Helper from '../../services/Helper/helper';

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

const CommentInput = (props) => {
    let { user } = props;

    const editor = useRef(null)

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

    const hanldeUpload = async (e) => {
        let rs;
        if (e.target.files[0].type.includes("image")) {
            rs = await DataService.uploadImage({ data: e.target.files[0], type: "images" })
        } else {
            rs = await DataService.uploadVideo({ data: e.target.files[0], type: "files" })
        }
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
            upload
        }
        let rs = await DataService.createPost(data)
        if (rs.code == 0) {
            setUpload([])
            setMarkupContent("<p></p>")
            setContent(() => EditorState.createWithContent(emptyContentState))
        }
        setLoading(false)
    }

    const onAddMention = (e) => {
        console.log(e)
        setMentions([...mentions, e])
    }

    const { MentionSuggestions } = mentionPlugin;

    return (
        <div className="post-comment-input">
            <input
                accept="image/*,video/*"
                style={{ display: "none" }}
                id="upload-comment"
                multiple
                type="file"
                onChange={hanldeUpload}
            />
            <div style={{ width: "7%" }}>
                <Avatar className="avatar" src={user.avatar} />
            </div>
            <div className="input" onClick={focus}>
                <div className="text-area">
                    <Editor
                        style={{ height: "100%" }}
                        editorState={content}
                        onChange={onChange}
                        plugins={plugins}
                        ref={editor}
                    />
                    <MentionSuggestions
                        onSearchChange={onSearchChange}
                        suggestions={suggestions}
                        onAddMention={onAddMention}
                    />
                    {
                        upload.length > 0 && (
                            <div className="comment-media">
                                {
                                    upload.map((upLoad, index) => {
                                        return (
                                            <div className="comment-media-item" key={upLoad.id}>
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
                                                            className="comment-media-item-close"
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
                </div>
                <div className="options">
                    {
                        upload.length == 0 && (
                            <label htmlFor="upload-comment">
                                <PhotoCameraOutlinedIcon className="options-item" />
                            </label>
                        )
                    }
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(CommentInput);