import React from 'react';
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

const Profile = (props) => {
    const router = useRouter()
    const { id } = router.query
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
        </Container>
    )
}

export default Profile;