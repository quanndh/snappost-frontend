import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useRouter } from 'next/router'
import store from '../redux/store';
import '../scss/styles.scss';
import Header from '../layout/Header/Header';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ContactBar from '../layout/ContactBar/ContactBar';
import ChatContainer from '../layout/ChatContainer/ChatContainer';
import 'emoji-mart/css/emoji-mart.css'
import {
	RecoilRoot,
} from 'recoil';
import LightOff from '../components/LightOff/LightOff';

const theme = createMuiTheme({
	palette: {
		primary: { main: "#1e88e5" },
	},

});

Router.events.on('routeChangeStart', url => {
	console.log(`Loading: ${url}`);
	NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
	NProgress.done()
})

Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
	let router = useRouter();

	let [pathname, setPathname] = useState(router.pathname);

	useEffect(() => {
		setPathname(router.pathname)
	}, [router.pathname])

	const header = () => {
		if (pathname !== "/auth") {
			return <Header />
		} else return null
	}

	const body = () => {

		if (pathname !== "/auth") {
			return (
				<Grid container style={{ backgroundColor: "#E9EBEE", height: "100%", position: 'relative' }}>
					<Grid item xs={10}>
						<LightOff />
						<Component {...pageProps} />
						<ChatContainer />
					</Grid>
					<Grid item xs={2} style={{ zIndex: 1, position: "relative" }}>
						<ContactBar />
					</Grid>
				</Grid>
			)
		} else {
			return <Component {...pageProps} />
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<RecoilRoot>
					{header()}
					{body()}
				</RecoilRoot>
			</Provider>
		</ThemeProvider>
	);
}
