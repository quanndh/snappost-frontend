import React, { useEffect } from 'react';
// import 'typeface-roboto';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post/Post';
import SideMenu from '../components/SideMenu';
import CreatePostInput from '../components/CreatePostInput/CreatePostInput';

export default function Index() {

	useEffect(() => {
	}, []);

	return (
		<div>
			<Container fixed className="newfeed-root">
				<Grid container spacing={3}>
					<Grid item xs={12} md={2} className="newfeed-left">
						<SideMenu />
					</Grid>
					<Grid item xs={12} md={7} className="newfeed-right">
						<CreatePostInput />
						<Post />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
