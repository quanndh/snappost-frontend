import React, { useEffect, useState } from 'react';
import { Paper, Avatar, Typography } from '@material-ui/core';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactHtmlParser from 'react-html-parser';
import Helper from '../../services/Helper/helper';
import ImageGallery from '../ImageGallery';

let images = [
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/2/200/300",
    "https://picsum.photos/id/3/200/300",
    "https://picsum.photos/id/4/200/300",
    "https://picsum.photos/id/5/200/300",
    "https://picsum.photos/id/6/200/300",
    "https://picsum.photos/id/7/200/300",
    "https://picsum.photos/id/8/200/300",
    "https://picsum.photos/id/9/200/300",
]

const Post = (props) => {

    const [value, setValue] = useState("");

    useEffect(() => {
        let jsonValue = localStorage.getItem("value");
        jsonValue = JSON.parse(jsonValue);
        setValue(jsonValue)
    }, [])

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
                    Ahihihi 📱
                    {ReactHtmlParser(Helper.jsonToHtml(value || []))}
                </div>
            </div>

            <div className="post-media">
                <ImageGallery images={images} startCount={5} />
            </div>
        </Paper>
    )
}


export default Post;