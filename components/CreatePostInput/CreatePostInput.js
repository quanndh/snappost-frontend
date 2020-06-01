import React, { useState, useMemo } from 'react';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Avatar from '@material-ui/core/Avatar';
import { Typography, InputBase, ClickAwayListener, Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GifIcon from '@material-ui/icons/Gif';
import { useRecoilState } from 'recoil';
import AtomProvide from '../../recoil/AtomProvider';
import ReactHtmlParser from 'react-html-parser';
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import Helper from '../../services/Helper/helper';


const CreatePostInput = (props) => {

    const { item } = props;

    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ])

    const [showCreatePost, setShowCreatePost] = useRecoilState(AtomProvide.showCreatePost)

    const handleOpenCreate = () => {
        if (!showCreatePost) {
            setShowCreatePost(true)
        }
    }

    return (
        <div style={{ position: 'relative', zIndex: showCreatePost ? 12 : 0 }} >
            <div className="create-post-container" onClick={handleOpenCreate}>
                <div className="create-post-body">
                    <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
                        {
                            item?.avatar ? (
                                <Avatar alt={item.name} src={item.avatar} className="avatar" />
                            ) : (
                                    <AccountCircleSharpIcon color="disabled" className="avatar" />
                                )
                        }

                        <div className="create-post-text" style={{ width: "80%" }}>
                            {
                                showCreatePost ? (
                                    <Slate style={{ marginLeft: 20 }} editor={editor} value={value} onChange={newValue => setValue(newValue)}>
                                        <Editable autoFocus={true} autoCorrect="true" placeholder="What is snapping in your head?" />

                                    </Slate>
                                ) : (
                                        <div style={{ overflowY: "hidden", color: value[0].children[0].text !== "" ? 'black' : "#bcbcbc" }}>
                                            {value[0].children[0].text !== "" ? ReactHtmlParser(Helper.jsonToHtml(value)) : "What is snapping in your head?"}
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div className="create-post-option">
                    <div className="create-post-option-item">
                        <ImageIcon />
                        <span>Video/Image</span>
                    </div>
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
                            <Button color="primary" disabled={value[0].children[0].text === ""} style={{ width: "100%", }} variant="contained">Snap</Button>

                        </div>
                    )
                }
            </div>
        </ div >
    )
}

export default CreatePostInput;