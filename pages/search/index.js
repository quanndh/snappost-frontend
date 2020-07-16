import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid';
import SideMenu from '../../components/SideMenu';
import CreatePostInput from '../../components/CreatePostInput/CreatePostInput';
import DataService from '../../network/DataService';
import { connect } from 'react-redux';
import ApiService from '../../services/ApiService/ApiService';
import UserCard from "../../components/UserCard/UserCard";
import FriendRequestCard from '../../components/FriendRequestCard.js/FriendRequestCard';
import Chip from '@material-ui/core/Chip';

const Index = ({ isDark, user }) => {

    let router = useRouter();

    const { keyword } = router.query;

    const [isLoading, setIsLoading] = useState(false)
    const [recommendUser, setRecommendUser] = useState([])
    const [init, setInit] = useState(true);
    const [page, setPage] = useState(1);
    const [type, setType] = useState(1);
    const [result, setResult] = useState([]);

    const getSearchResult = async () => {
        if (keyword) {
            let rs = await DataService.search({ keyword, type });
            setResult(rs.data)
        }
    }

    const getRecommendFriend = async () => {
        let rs = await DataService.getRecommendFriend({ limit: 5, page: 1 });
        setRecommendUser(rs.data)
    }

    useEffect(() => {
        getSearchResult()
        if (init) {
            getRecommendFriend()
        }

        setInit(false)

        return () => {

        }
    }, [keyword]);

    return (
        <div style={{ backgroundColor: isDark ? "#18191A" : "#E9EBEE" }}>
            <Container fixed className="newfeed-root">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={2} className="newfeed-left">
                        <SideMenu user={user} />
                    </Grid>
                    <Grid item xs={12} md={7} className="newfeed-right" >
                        <div className="option-container">
                            <Chip
                                variant={type == 1 ? "default" : "outlined"}
                                label="People" className="option"
                                onClick={() => setType(1)}
                            />
                            <Chip
                                variant={type == 2 ? "default" : "outlined"}
                                label="Post"
                                className="option"
                                onClick={() => setType(2)}
                            />
                        </div>
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
