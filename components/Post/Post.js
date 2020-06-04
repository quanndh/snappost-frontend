import React, { useEffect, useState } from 'react';
import { Paper, Avatar, Typography } from '@material-ui/core';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactHtmlParser from 'react-html-parser';
import Helper from '../../services/Helper/helper';

const Post = (props) => {

    const [value, setValue] = useState("");

    useEffect(() => {
        let jsonValue = localStorage.getItem("value");
        jsonValue = JSON.parse(jsonValue);
        setValue(jsonValue)
    }, [])

    let images = [
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    ]

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
                    {ReactHtmlParser(Helper.jsonToHtml(value || []))}
                </div>
            </div>
            <div className="post-media">
            </div>
        </Paper>
    )
}


export default Post;