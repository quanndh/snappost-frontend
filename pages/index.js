import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post/Post';
import SideMenu from '../components/SideMenu';
import CreatePostInput from '../components/CreatePostInput/CreatePostInput';
import AuthComponent from '../components/AuthComponent/AuthComponent';
import DataService from '../network/DataService';
import { connect } from 'react-redux';
import ApiService from '../services/ApiService/ApiService';

const Index = ({ posts, isDark }) => {

	const [loadMore, setLoadMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false)

	const getNewFeedPost = async () => {
		if (loadMore) {
			setIsLoading(true)
			let rs = await DataService.getPost({ limit: 3, skip: posts?.length });
			setIsLoading(false)
			ApiService.setNewFeed({ data: rs.data, newPost: false })
			setLoadMore(false)
		}

	}

	useEffect(() => {
		getNewFeedPost()

		window.addEventListener("scroll", () => {
			if (document.body.clientHeight - window.scrollY - window.innerHeight < 100) {
				setLoadMore(true)
			}
		})

		return () => {
			window.removeEventListener("scroll", () => { })
		}
	}, [loadMore]);

	return (
		<div style={{ backgroundColor: isDark ? "#18191A" : "#E9EBEE" }}>
			<Container fixed className="newfeed-root">
				<Grid container spacing={3}>
					<Grid item xs={12} md={2} className="newfeed-left">
						<SideMenu />
					</Grid>
					<Grid item xs={12} md={7} className="newfeed-right" >
						<CreatePostInput style={{ zIndex: 4 }} />
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
			</Container>
		</div >
	);
}

const mapStateToProps = state => {
	return {
		posts: state.newFeedReducer.posts,
		isDark: state.uiReducer.isDark
	}
}

export default connect(mapStateToProps)(Index);
