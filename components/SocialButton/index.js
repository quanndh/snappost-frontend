import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import { FacebookAppId, GoogleClientId, GithubClientId } from '../../constants';
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from '@material-ui/core/Button';
import DataService from '../../network/DataService';
import helpers from '../../services/Helper/helper';
import ApiService from '../../services/ApiService/ApiService';
import Router from 'next/router'

const SocialButton = () => {

    const responseFacebook = async (response) => {
        console.log(response)
        const { name, email, userID, picture } = response;
        let avatar = picture.data.url;
        const user = {
            name,
            email,
            id: userID,
            avatar,
            type: "facebook"
        }
        let rs = await DataService.loginSocialNetwork(user);
        if (rs.code != 0) {
            helpers.activateToast("error", rs.message)
        } else {
            ApiService.login(rs.data, rs.token)
            Router.push("/")
        }
    }

    const googleFail = (response) => {
        console.log(response)
    }

    const responseGoogle = async (response) => {
        let { name, email, googleId, imageUrl } = response.profileObj;
        const user = {
            name,
            email,
            id: googleId,
            avatar: imageUrl,
            type: "google"
        }
        let rs = await DataService.loginSocialNetwork(user);
        if (rs.code != 0) {
            helpers.activateToast("error", rs.message)
        } else {
            ApiService.login(rs.data, rs.token)
            Router.push("/")
        }

    }

    return (
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <FacebookLogin
                appId={FacebookAppId}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={renderProps => (
                    <Button
                        onClick={renderProps.onClick}
                        variant="contained"
                        style={{ backgroundColor: '#3b5998', color: "white", height: 60 }}
                        startIcon={<FacebookIcon style={{ fontSize: 30 }} />}
                    >
                        Facebook
                    </Button>
                )}
            />

            <GoogleLogin
                autoLoad={false}
                clientId={GoogleClientId}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={googleFail}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <Button
                        onClick={renderProps.onClick}
                        variant="contained"
                        style={{
                            backgroundColor: '#E1422F', color: "white", height: 60,
                        }}
                    // startIcon={<FacebookIcon />}
                    >
                        <img src="/static/assets/ggLogo.png" width="30" height="30" style={{ marginRight: 10 }} />
                        Google
                    </Button>
                )}
            />
        </div>

    )
}

export default SocialButton;