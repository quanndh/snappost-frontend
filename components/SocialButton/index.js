import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import { FacebookAppId, GoogleClientId, GithubClientId } from '../../constants';
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from '@material-ui/core/Button';

const SocialButton = () => {

    const responseFacebook = (response) => {
        console.log(response);
    }

    const componentClicked = () => {
        console.log('click')
    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <FacebookLogin
                appId={FacebookAppId}
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
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
                clientId={GoogleClientId}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
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