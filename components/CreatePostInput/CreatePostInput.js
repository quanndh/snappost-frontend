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
import CustomInput from '../CustomInput/CustomInput';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import Mention from '../Mention/Mention';

const mentionPlugin = createMentionPlugin({
    mentionComponent: (mentionProps) => (
        <Mention mentionProps={mentionProps} />
    ),
});

const linkifyPlugin = createLinkifyPlugin();

let plugins = [mentionPlugin, linkifyPlugin]

const CreatePostInput = (props) => {

    const { user } = props;

    const { showCreatePost } = props;

    const editor = useRef(null)

    const [content, setContent] = useState(EditorState.createEmpty())

    const [suggestions, setSuggestions] = useState([
        {
            name: 'Matthew Russell',
            link: 'https://twitter.com/mrussell247',
            avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
        },
        {
            name: 'Julian Krispel-Samsel',
            link: 'https://twitter.com/juliandoesstuff',
            avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
        },
        {
            name: 'Jyoti Puri',
            link: 'https://twitter.com/jyopur',
            avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
        },
        {
            name: 'Max Stoiber',
            link: 'https://twitter.com/mxstbr',
            avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
        },
        {
            name: 'Nik Graf',
            link: 'https://twitter.com/nikgraf',
            avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
        },
        {
            name: 'Pascal Brandt',
            link: 'https://twitter.com/psbrandt',
            avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
        },
    ]);



    const focus = () => {
        editor.current.focus();
    };

    const onSearchChange = ({ value }) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions))
        // if (value) {
        //     setTimeout(async () => {
        //         let rs = await DataService.findTagFriend({ name: value });
        //         let data = [];
        //         rs.data.map(item => {
        //             data.push({
        //                 id: item.id,
        //                 name: item.firstName + " " + item.lastName,
        //                 avatar: item.avatar,
        //                 wallImage: item.wallImage
        //             })
        //         })
        //         setSuggestions(data)
        //     }, 200)
        // }
    };

    const onChange = (editorState) => {
        setContent(editorState)
    };

    const handleOpenCreate = () => {
        if (!showCreatePost) {
            ApiService.toggleCreatePost()
        }
    }

    const hanldeUpload = async (e) => {
        let rs;
        if (e.target.files[0].type.includes("image")) {
            rs = await DataService.uploadImage({ data: e.target.files[0], type: "images" })
        } else {
            rs = await DataService.uploadFile({ data: e.target.files[0], type: "files" })
        }
        console.log(rs)
    }

    const { MentionSuggestions } = mentionPlugin;

    return (
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
                                disabled={"value[0].children[0].text" === ""}
                                style={{ width: "100%", }}
                                variant="contained"
                                onClick={() => localStorage.setItem("value", JSON.stringify(value))}
                            >
                                Snap
                            </Button>
                        </div>
                    )
                }
            </div>
        </ div >
    )
}

const mapStateToProps = state => {
    return {
        showCreatePost: state.uiReducer.showCreatePost,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(CreatePostInput);