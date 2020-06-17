import React from 'react';
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container';
import { Typography, Grid } from '@material-ui/core';
import CreatePostInput from '../../components/CreatePostInput/CreatePostInput';
import PersonalDescription from '../../components/PersonalDescription/PersonalDescription';
import Paper from '@material-ui/core/Paper';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import Post from '../../components/Post/Post';
import AuthComponent from '../../components/AuthComponent/AuthComponent';

const Profile = (props) => {

    const router = useRouter()
    const { id } = router.query;

    return (
        <Container className="profile-container" maxWidth="lg">
            <div className="profile-header">
                <img src="https://picsum.photos/700/800" className="profile-wall-pic" />
                <div className="profile-user">
                    <img src="https://picsum.photos/200/200" className="profile-avatar" />
                    <div>
                        <Typography variant="h4">Quan Nguyen</Typography>
                        <Typography variant="h5">(Ghê vl)</Typography>
                    </div>
                </div>
            </div>
            <div className="profile-nav-container">
                <div className="profile-nav">
                    <Typography variant="h5" className="profile-nav-item">Timeline</Typography>
                    <Typography variant="h5" className="profile-nav-item">Friend</Typography>
                    <Typography variant="h5" className="profile-nav-item">Picture</Typography>
                    <Typography variant="h5" className="profile-nav-item">Infor</Typography>
                </div>
            </div>

            <Grid container spacing={3} className="profile-body">
                <Grid item xs={5}>
                    <Paper elevation={0} className="profile-description">
                        <PersonalDescription />
                        <PersonalInformation />

                    </Paper>
                </Grid>
                <Grid item xs={7}>
                    <CreatePostInput />
                    <Post />
                </Grid>
            </Grid>
        </Container >
    )
}

// export async function getServerSideProps({ params }) {
//     console.log(params)
//     let rs = await fetch("http://localhost:9000/profiles/" + params.id);
//     rs = await rs.json();
//     console.log(rs)
//     return {
//         props: { ...rs }
//     }
// }

export default Profile;