import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Post from '../../components/Post/Post';
import SideMenu from '../../components/SideMenu';
import CreatePostInput from '../../components/CreatePostInput/CreatePostInput';
import DataService from '../../network/DataService';
import { connect } from 'react-redux';
import ApiService from '../../services/ApiService/ApiService';
import UserCard from "../../components/UserCard/UserCard";
import FriendRequestCard from '../../components/FriendRequestCard.js/FriendRequestCard';

const Index = ({ isDark, user }) => {

    const [loadMore, setLoadMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [recommendUser, setRecommendUser] = useState([])
    const [init, setInit] = useState(true);
    const [page, setPage] = useState(1)
    const [request, setRequest] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0)

    const getFriendRequest = async () => {
        if (loadMore) {
            setIsLoading(true)
            let rs = await DataService.getFriendRequest({ limit: 10, skip: (page - 1) * 10 });
            setRequest(rs.data)
            setTotalRequest(rs.totalRecord);
            setIsLoading(false)
            setLoadMore(false)
        }
    }

    const getRecommendFriend = async () => {
        let rs = await DataService.getRecommendFriend({ limit: 5, page: 1 });
        setRecommendUser(rs.data)
    }

    useEffect(() => {
        getFriendRequest()
        if (init) {
            getRecommendFriend()
        }

        setInit(false)

        return () => {

        }
    }, [loadMore]);

    return (
        <div style={{ backgroundColor: isDark ? "#18191A" : "#E9EBEE" }}>
            <Container fixed className="newfeed-root">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={2} className="newfeed-left">
                        <SideMenu user={user} />
                    </Grid>
                    <Grid item xs={12} md={7} className="newfeed-right" >
                        <div>
                            <p>Total request: {totalRequest}</p>
                        </div>
                        {
                            request.length ? request.map(r => {
                                return <FriendRequestCard key={r.id} requestId={r.id} user={r.from} />
                            }) : null
                        }
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ position: "sticky", top: "85px" }}>
                            {
                                recommendUser.map(user => {
                                    return <UserCard key={"user" + user.id} user={user} />
                                })
                            }
                        </div>

                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

const mapStateToProps = state => {
    return {
        isDark: state.uiReducer.isDark,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(Index);
