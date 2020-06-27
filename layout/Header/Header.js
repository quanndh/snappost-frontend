import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Container from '@material-ui/core/Container';
import Link from 'next/link'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Divider } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CustomTooltip from '../../components/CustomTooltip/CustomTooltip';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1,
	},

	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',

		[theme.breakpoints.up('xs')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
		[theme.breakpoints.up('lg')]: {
			marginLeft: theme.spacing(3),
			width: '600px',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: "100%"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '100%',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},

	iconButton: {
		marginLeft: theme.spacing(3)
	}
}));

function Header({ user }) {
	const classes = useStyles();

	const [openMore, setOpenMore] = React.useState(false);
	const [openNotification, setOpenNotification] = React.useState(false);

	const moreRef = React.useRef(null);
	const notificationRef = React.useRef(null);

	const handleToggleMore = () => {
		setOpenMore((prevOpenMore) => !prevOpenMore);
		if (openNotification) {
			setOpenNotification((prevOpenNotification) => !prevOpenNotification);
		}
	};

	const handleToggleNotification = () => {
		setOpenNotification((prevOpenNotification) => !prevOpenNotification);
		if (openMore) {
			setOpenMore((prevOpenMore) => !prevOpenMore);
		}
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpenMore(false);
			setOpenNotification(false)
		}
	}

	const handleClose = (event) => {
		if (moreRef.current && moreRef.current.contains(event.target)) {
			return;
		}

		if (notificationRef.current && notificationRef.current.contains(event.target)) {
			return;
		}

		setOpenMore(false);
		setOpenNotification(false);
	};

	const prevOpenMore = React.useRef(openMore);
	const prevOpenNotification = React.useRef(openNotification);

	React.useEffect(() => {
		if (prevOpenMore.current === true && openMore === false) {
			moreRef.current.focus();
		}

		if (prevOpenNotification.current === true && prevOpenNotification === false) {
			notificationRef.current.focus();
		}

		prevOpenMore.current = openMore;
		prevOpenNotification.current = openNotification;
	}, [openMore, openNotification]);

	return (
		<div className={classes.grow} style={{
			position: "fixed",
			width: "100%",
			zIndex: 999,
		}}>
			<AppBar position="static">
				<Grid container>
					<Grid item xs={10}>
						<Container fixed>
							<Toolbar style={{ paddingLeft: 0 }}>
								<CustomTooltip title="Snappost">
									<div className="logo">
										<Link href="/">
											<img src="/static/assets/appLogo.png" className="route-link" style={{ marginRight: 10 }} />
										</Link>
										<Link href="/" >
											<Typography className={classes.title} className="route-link" variant="h6" noWrap>
												Snappost
											</Typography>
										</Link>
									</div>
								</CustomTooltip>

								<div className={classes.search}>
									<div className={classes.searchIcon}>
										<SearchIcon />
									</div>
									<InputBase
										placeholder="Search…"
										classes={{
											root: classes.inputRoot,
											input: classes.inputInput,
										}}
										inputProps={{ 'aria-label': 'search' }}
									/>
								</div>
								<div className={classes.grow} />

								<div className={classes.sectionDesktop}>
									<CustomTooltip title="Message">
										<IconButton className={classes.iconButton} aria-label="show 4 new mails" color="inherit">
											<Badge badgeContent={4} color="secondary">
												<MailIcon />
											</Badge>
										</IconButton>
									</CustomTooltip>

									<CustomTooltip title="Notification">
										<IconButton
											className={classes.iconButton}
											ref={notificationRef}
											aria-label="show 17 new notifications"
											color="inherit"
											aria-controls={openNotification ? 'menu-list-grow-notification' : undefined}
											aria-haspopup="true"
											onClick={handleToggleNotification}
										>
											<Badge badgeContent={17} color="secondary">
												<NotificationsIcon />
											</Badge>
										</IconButton>
									</CustomTooltip>

									<Popper open={openNotification} anchorEl={notificationRef.current} role={undefined} transition disablePortal>
										{({ TransitionProps, placement }) => (
											<Grow
												{...TransitionProps}
												style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
											>
												<Paper style={{ minWidth: 350, minHeight: 200 }}>
													<ClickAwayListener onClickAway={handleClose}>
														<MenuList autoFocusItem={openNotification} id="menu-list-grow-notification" onKeyDown={handleListKeyDown}>
															<MenuItem onClick={handleClose} style={{ display: 'flex', alignItems: "center" }}>
																<Avatar alt={user.firstName} src={user.avatar} style={{ fontSize: 50, marginRight: 8 }} />
																<div>
																	<Typography variant="h5">Quan Nguyen</Typography>
																	<Typography variant="subtitile1">@quannguyen</Typography>
																</div>
															</MenuItem>
															<Divider />
															<MenuItem style={{ marginTop: 12 }}>
																<SettingsIcon color="action" style={{ marginRight: 8, fontSize: 30 }} />
																<Typography variant="subtitile1">Setting</Typography>
															</MenuItem>
															<MenuItem style={{ marginTop: 8 }}>
																<ExitToAppIcon color="action" style={{ marginRight: 8, fontSize: 30 }} />
																<Typography variant="subtitile1">Logout</Typography>
															</MenuItem>
														</MenuList>
													</ClickAwayListener>
												</Paper>
											</Grow>
										)}
									</Popper>

									<CustomTooltip title="Information">
										<IconButton
											className={classes.iconButton}
											ref={moreRef}
											edge="end"
											aria-label="account of current user"
											aria-controls={openMore ? 'menu-list-grow' : undefined}
											aria-haspopup="true"
											onClick={handleToggleMore}
											// onClick={handleProfileMenuOpen}
											color="inherit"
										>
											<ArrowDropDownIcon />
										</IconButton>
									</CustomTooltip>

									<Popper open={openMore} anchorEl={moreRef.current} role={undefined} transition disablePortal

									>
										{({ TransitionProps, placement }) => (
											<Grow
												{...TransitionProps}
												style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
											>
												<Paper style={{ minWidth: 350, minHeight: 200 }}>
													<ClickAwayListener onClickAway={handleClose}>
														<MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
															<Link href={`/profile/${user.id}`}>
																<MenuItem style={{ display: 'flex', alignItems: "center" }}>
																	<Avatar alt={user.firstName} src={user.avatar} style={{ fontSize: 50, marginRight: 8 }} />
																	<div>
																		<Typography variant="h5">{user.firstName} {user.lastName}</Typography>
																		<Typography variant="subtitle1">@quannguyen</Typography>
																	</div>
																</MenuItem>
															</Link>

															<Divider />
															<MenuItem style={{ marginTop: 12 }}>
																<SettingsIcon color="action" fontSize="large" style={{ marginRight: 8 }} />
																<Typography variant="subtitle1">Setting</Typography>
															</MenuItem>
															<MenuItem style={{ marginTop: 8 }}>
																<ExitToAppIcon color="action" fontSize="large" style={{ marginRight: 8 }} />
																<Typography variant="subtitle1">Logout</Typography>
															</MenuItem>
														</MenuList>
													</ClickAwayListener>
												</Paper>
											</Grow>
										)}
									</Popper>
								</div>
							</Toolbar>
						</Container>
					</Grid>

					<Grid item xs={2}>

					</Grid>
				</Grid>
			</AppBar>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps)(Header);