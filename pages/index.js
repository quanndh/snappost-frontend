import React, { useEffect } from 'react';
// import 'typeface-roboto';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post/Post';
import SideMenu from '../components/SideMenu';

export default function Index() {

	useEffect(() => {
	}, []);

	return (
		<Container maxWidth className="container-content newfeed-root">
			<Grid container spacing={3}>
				<Grid item xs={12} md={2} className="newfeed-left">
					<SideMenu />
				</Grid>
				<Grid item xs={12} md={10} className="newfeed-right">
					<Post />
				</Grid>
			</Grid>
		</Container>
	);
}
