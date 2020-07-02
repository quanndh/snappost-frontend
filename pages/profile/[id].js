import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container';
import { Typography, Grid } from '@material-ui/core';
import CreatePostInput from '../../components/CreatePostInput/CreatePostInput';
import PersonalDescription from '../../components/PersonalDescription/PersonalDescription';
import Paper from '@material-ui/core/Paper';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import Post from '../../components/Post/Post';
import { connect } from 'react-redux';
import AuthComponent from '../../components/AuthComponent/AuthComponent';
import DataService from '../../network/DataService';
import ApiService from '../../services/ApiService/ApiService';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CustomTooltip from '../../components/CustomTooltip/CustomTooltip';
import ImageEditor from "../../components/ImageEditor/ImageEditor";

const Profile = ({ posts, isMore, user }) => {

    const router = useRouter()
    const { id } = router.query;

    if (!id) {
        return null
    }

    const [loadMore, setLoadMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [userLoad, setUserLoad] = useState(false)
    const [profile, setProfile] = useState({});
    const [init, setInit] = useState(true)
    const [imageToChange, setImageToChange] = useState(null);
    const [imageType, setImageType] = useState(null);
    const [loadImage, setLoadImage] = useState(false)
    const [openEditImage, setOpenEditImage] = useState(false)
    const [editedImage, setEditedImage] = useState(null)

    const getNewFeedPost = async () => {
        if (loadMore && isMore) {
            setIsLoading(true)
            let rs = await DataService.getPost({ limit: 3, skip: posts?.length, userId: id });
            setIsLoading(false)
            ApiService.setNewFeed({ data: rs.data, newPost: false, isMore: rs.isMore })
            setLoadMore(false)
        }
    }

    const getUserInfo = async () => {
        setUserLoad(true);
        let rs = await DataService.getUserProfile({ userId: id })
        setUserLoad(false);
        if (rs.code == 404) {
            router.push("/404")
        }
        setProfile(rs.data)
    }

    useEffect(() => {
        if (init) {
            getUserInfo()
        }
        getNewFeedPost()
        window.addEventListener("scroll", () => {
            if (document.body.clientHeight - window.scrollY - window.innerHeight < 100) {
                setLoadMore(true)
            }
        })

        setInit(false)

        return () => {
            window.removeEventListener("scroll", () => { })
        }
    }, [loadMore]);

    const handleUpdateUser = object => {
        let tempUser = { ...profile };
        for (let i in object) {
            tempUser[i] = object[i];
        }
        setProfile(tempUser);
    }

    const handleUpLoad = async (e) => {
        setLoadImage(true)
        let rs = await DataService.uploadImage({ data: e.target.files[0], type: "images" })
        setLoadImage(false)
        setImageToChange(rs.data[0])
        setOpenEditImage(true)
    }

    const handleCancelEditImage = () => {
        setImageToChange(null)
        setImageType(null)
        setOpenEditImage(false)
    }

    return (
        <>
            {
                imageToChange ? (
                    <ImageEditor handleCancelEditImage={handleCancelEditImage} imageToChange={imageToChange} />
                ) : null
            }

            <Container className="profile-container" maxWidth="lg">
                <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="wallPicture"
                    multiple
                    type="file"
                    onChange={(e) => {
                        setImageType("wallPic")
                        handleUpLoad(e)
                    }}
                />
                <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="avatarChange"
                    multiple
                    type="file"
                    onChange={(e) => {
                        setImageType("avatar")
                        handleUpLoad(e)
                    }}
                />
                <Paper className="profile-header">
                    {
                        profile?.wallImage ? (
                            <img src={profile.wallImage} className="profile-wall-pic" />
                        ) : (
                                <div className="profile-wall-pic" />
                            )
                    }
                    <div className="profile-user">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ position: 'relative' }}>
                                <img src={profile?.avatar} className="profile-avatar" />

                                {
                                    profile?.isMe ? (
                                        <label htmlFor="avatarChange">
                                            <div style={{ position: 'absolute', right: 10, top: "65%", zIndex: 10 }}>
                                                <CustomTooltip title="Change avatar">
                                                    <div className="primary-button">
                                                        <CameraAltIcon />
                                                    </div>
                                                </CustomTooltip>
                                            </div>
                                        </label>

                                    ) : null
                                }

                            </div>
                            <Paper elevation={0}>
                                <Typography variant="h4">{profile?.firstName + " " + profile?.lastName}</Typography>
                                {
                                    profile?.nickname ? <Typography variant="h5">({profile?.nickname})</Typography> : null
                                }

                            </Paper>
                        </div>

                        {
                            profile?.isMe ? (
                                <label htmlFor="wallPicture">
                                    <div className="primary-button">
                                        <CameraAltIcon />
                                        <span>Change wall picture</span>
                                    </div>

                                </label>
                            ) : null
                        }

                    </div>
                </Paper>
                <Paper className="profile-nav-container">
                    <Paper elevation={0} className="profile-nav">
                        <span className="profile-nav-item">Timeline</span>
                        <span className="profile-nav-item">Friend</span>
                        <span className="profile-nav-item">Picture</span>
                        <span className="profile-nav-item">Infor</span>
                    </Paper>
                </Paper>

                <Grid container spacing={3} className="profile-body">
                    <Grid item xs={5}>
                        <Paper elevation={3} className="profile-description">
                            {
                                profile ? (
                                    <>
                                        <PersonalDescription
                                            bio={profile.bio}
                                            user={user}
                                            handleUpdateUserCB={handleUpdateUser}
                                            isMe={profile.isMe}
                                        />

                                        <PersonalInformation
                                            school={profile?.school}
                                            company={profile?.company}
                                            currentLocation={profile?.currentLocation}
                                            bornIn={profile?.bornIn}
                                            handleUpdateUserCB={handleUpdateUser}
                                            isMe={profile.isMe}
                                        />
                                    </>
                                ) : null
                            }

                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <CreatePostInput />
                        {
                            posts.map(post => {
                                return <Post key={"post" + post.id} style={{ zIndex: 3 }} data={post} />
                            })
                        }
                        {
                            isLoading ? (
                                <>
                                    <Post loading={true} style={{ zIndex: 3 }} />
                                    <Post loading={true} style={{ zIndex: 3 }} />
                                    <Post loading={true} style={{ zIndex: 3 }} />
                                </>
                            ) : null
                        }
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.newFeedReducer.posts,
        isMore: state.newFeedReducer.isMore,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(Profile);