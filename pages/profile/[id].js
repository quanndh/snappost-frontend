import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container';
import { Typography, Grid, IconButton, Button } from '@material-ui/core';
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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import helper from '../../services/Helper/helper';

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

    const onClickSaveImage = async () => {
        let rs = await DataService.userChangeImage({ type: imageType, image: imageToChange });
        if (rs.code == 0) {
            handleUpdateUser(imageType == "avatar" ? { avatar: imageToChange.url } : { wallImage: imageToChange.url })
            ApiService.login(rs.user, rs.token)
            helper.activateToast("default", rs.message)
            ApiService.setNewFeed({ data: [rs.data], newPost: true })
            setOpenEditImage(false)
        }
    }

    return (
        <>
            {
                imageToChange ? (
                    <Dialog style={{ zIndex: 1000 }} maxWidth={imageType == "avatar" ? "xs" : "lg"} fullWidth={true} open={openEditImage} onClose={handleCancelEditImage}>
                        <DialogTitle>Change avatar</DialogTitle>
                        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", marginBottom: 24 }}>
                                <img src={imageToChange.url} style={{ width: "100%", height: "100%" }} />
                            </div>
                            <Button onClick={onClickSaveImage} style={{ marginBottom: 16 }} color="primary" fullWidth variant="contained">Save</Button>
                        </DialogContent>
                    </Dialog>
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
                        setImageType("wallImage")
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
                    <div className="profile-wall-pic" style={{ position: "relative" }}>
                        {
                            profile?.wallImage ? (
                                <img src={profile.wallImage} className="profile-wall-pic" />
                            ) : (
                                    <div className="profile-wall-pic" />
                                )
                        }
                        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", backgroundColor: "rgba(0,0,0,0.3)" }} />
                    </div>
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
                            <Paper elevation={0} style={{ background: "none" }}>
                                <Typography variant="h4" >{profile?.firstName + " " + profile?.lastName}</Typography>
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