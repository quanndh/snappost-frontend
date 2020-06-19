import React, { useEffect, useState } from 'react';
// import 'typeface-roboto';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post/Post';
import SideMenu from '../components/SideMenu';
import CreatePostInput from '../components/CreatePostInput/CreatePostInput';
import AuthComponent from '../components/AuthComponent/AuthComponent';
import DataService from '../network/DataService';

const Index = () => {

	const [posts, setPosts] = useState([]);

	const getNewFeedPost = async () => {
		let rs = await DataService.getPost({ limit: 1, skip: 0 });
		setPosts(rs.data)
	}

	useEffect(() => {
		getNewFeedPost()
	}, []);

	return (
		<div>
			<Container fixed className="newfeed-root">
				<Grid container spacing={3}>
					<Grid item xs={12} md={2} className="newfeed-left">
						<SideMenu />
					</Grid>
					<Grid item xs={12} md={7} className="newfeed-right">
						<CreatePostInput style={{ zIndex: 4 }} />
						{
							posts?.length > 0 ? posts.map(post => {
								return <Post key={post.id} style={{ zIndex: 3 }} data={post} />
							}) : null
						}
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Index;
