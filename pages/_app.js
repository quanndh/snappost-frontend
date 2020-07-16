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
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import LightOff from '../components/LightOff/LightOff';
import ApiService from '../services/ApiService/ApiService';
import { Paper } from '@material-ui/core';
import { firebaseCloudMessaging } from '../utils/webPush'
import firebase from 'firebase/app';
import io from '../utils/socket';

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
	const [isDark, setIsDark] = useState(false)
	const [init, setInit] = useState(true)

	useEffect(() => {
		setPathname(router.pathname)
		ApiService.setStore(store)

		let user = JSON.parse(localStorage.getItem('user'));
		let token = localStorage.getItem('token');

		if (pathname != "/auth") {
			if (!user) {
				Router.replace('/auth')
			} else if (user.isNewUser) {
				Router.replace('/welcome')
			}
		} else {
			if (user) {
				Router.replace('/')
			}
		}

		ApiService.login(user, token)

		ApiService.setMood({ isDark: JSON.parse(localStorage.getItem('isDark')) });
		setIsDark(JSON.parse(localStorage.getItem('isDark')));

		const getMessage = () => {
			const messaging = firebase.messaging();
			messaging.onMessage((message) => console.log('foreground', message));
		}

		const getFcmToken = async () => {
			try {
				const token = await firebaseCloudMessaging.init();
				if (token) {
					localStorage.setItem("fcm_token", token)
					getMessage();
				}
			} catch (error) {
				console.log("error", error)
			}
		}

		if (init) {
			io.socket.on("notification", event => {
				console.log("noti", event.data);
			})

			getFcmToken();
			setInit(false);
		}

		return () => {

		}

	}, [router.pathname])


	const theme = createMuiTheme({
		palette: {
			primary: { main: "#1e88e5" },
			type: isDark ? "dark" : "light"
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				{
					pathname != "/auth" && pathname !== "/welcome" ? <Header isDark={isDark} onToggleMood={() => {
						ApiService.toggleDarkMood({ isDark: !isDark })
						setIsDark(!isDark);
					}} /> : null
				}

				{
					pathname !== "/auth" && pathname !== "/welcome" ? (
						< Grid className="container-content" container style={{ height: "100%", position: 'relative' }}>
							<Grid item xs={10} >
								<Paper style={{ backgroundColor: isDark ? "#18191A" : "#E9EBEE" }}>
									<LightOff />
									<Component {...pageProps} />
									<ChatContainer />
								</Paper>
							</Grid>
							<Grid item xs={2} style={{ zIndex: 1, position: "relative", height: "100%" }}>
								<ContactBar />
							</Grid>
						</Grid>
					) : (
							<Component {...pageProps} />
						)
				}
				<ToastContainer
					pauseOnFocusLoss={false}
					autoClose={3000}
					position={toast.POSITION.BOTTOM_LEFT}
					transition={Slide}
				/>
			</Provider>
		</ThemeProvider >
	);
}
