import React, { useState, useEffect } from 'react';
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

const Profile = ({ posts, isMore }) => {

    const router = useRouter()
    const { id } = router.query;

    if (!id) {
        return null
    }

    const [loadMore, setLoadMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [profile, setProfile] = useState({});
    const [init, setInit] = useState(true)

    const getNewFeedPost = async () => {
        if (loadMore && isMore) {
            setIsLoading(true)
            console.log(id, 111)
            let rs = await DataService.getPost({ limit: 3, skip: posts?.length, userId: id });
            setIsLoading(false)
            ApiService.setNewFeed({ data: rs.data, newPost: false, isMore: rs.isMore })
            setLoadMore(false)
        }
    }

    const getUserInfo = async () => {
        let rs = await DataService.getUserProfile({ userId: id })
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

    return (
        <Container className="profile-container" maxWidth="lg">
            <Paper className="profile-header">
                {
                    profile.wallImage ? (
                        <img src={profile.wallImage} className="profile-wall-pic" />
                    ) : (
                            <div className="profile-wall-pic" />
                        )
                }
                <div className="profile-user">
                    <img src={profile.avatar} className="profile-avatar" />
                    <Paper elevation={0}>
                        <Typography variant="h4">{profile.firstName + " " + profile.lastName}</Typography>
                        {
                            profile.nickname ? <Typography variant="h5">({profile.nickname})</Typography> : null
                        }

                    </Paper>
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
                        <PersonalDescription />
                        <PersonalInformation profile={profile} />
                    </Paper>
                </Grid>
                <Grid item xs={7}>
                    <CreatePostInput />
                    {
                        posts && posts?.length > 0 ? posts.map(post => {
                            return <Post key={"post" + post.id} style={{ zIndex: 3 }} data={post} />
                        }) : null
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
    )
}

const mapStateToProps = state => {
    return {
        posts: state.newFeedReducer.posts,
        isMore: state.newFeedReducer.isMore
    }
}

export default connect(mapStateToProps)(Profile);