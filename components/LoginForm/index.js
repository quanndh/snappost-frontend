import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataService from '../../network/DataService';
import helper from '../../services/Helper/helper';
import ApiService from '../../services/ApiService/ApiService';
import Router from 'next/router'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = (props) => {
    const [openForget, setOpenForget] = React.useState(false);
    const [resetEmail, setResetEmail] = useState("")
    const [resetDisable, setResetDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickOpen = () => {
        setOpenForget(true);
    };

    const handleClose = () => {
        setOpenForget(false);
    };

    const {
        values: { loginEmail, loginPassword },
        errors,
        touched,
        handleSubmit,
        handleChange,
        isValid,
        setFieldTouched
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    }

    const handleLogin = async () => {
        setIsLoading(true)
        let rs = await DataService.login({ email: loginEmail, password: loginPassword })
        setIsLoading(false)
        if (rs.code !== 0) {
            helper.activateToast("error", rs.message)
        } else {
            ApiService.login(rs.data, rs.token)
            Router.push("/")
        }
    }

    return (
        <>
            <Dialog
                open={openForget}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Reset your password"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Please enter your email. A link will be sent to your email address, use that link to reset your password
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={resetEmail}
                        onChange={(e) => {
                            setResetEmail(e.target.value)
                            if (e.target.value.trim() === "" || !mailReg.test(e.target.value)) {
                                setResetDisable(true)
                            } else {
                                setResetDisable(false);
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button disabled={resetDisable ? true : false} onClick={handleClose} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>

            <Typography className="title" variant="subtitle1">Snap your story now !!</Typography>

            <br />

            <div className="form-container">
                <TextField
                    style={{ width: "100%", marginBottom: 36 }}
                    name="loginEmail"
                    label="Your Email Address"
                    variant="outlined"
                    helperText={touched.loginEmail ? errors.loginEmail : ""}
                    error={touched.loginEmail && Boolean(errors.loginEmail)}
                    value={loginEmail}
                    onChange={change.bind(null, "loginEmail")}
                />
                <TextField
                    type="password"
                    helperText={touched.loginPassword ? errors.loginPassword : ""}
                    error={touched.loginPassword && Boolean(errors.loginPassword)}
                    onChange={change.bind(null, "loginPassword")}
                    value={loginPassword}
                    style={{ width: "100%", marginBottom: 36 }}
                    name="loginPassword"
                    label="Your Password"
                    variant="outlined"
                />

                <Button onClick={handleLogin} disabled={(errors.loginEmail || errors.loginPassword || loginEmail === "" || loginPassword === "") ? true : false} variant="contained" color="primary" style={{ width: "100%", height: 44 }}>
                    {isLoading ? <CircularProgress style={{ color: "white" }} /> : "Login"}
                </Button>
            </div>

            <br />

            <div style={{ display: 'flex', justifyContent: 'space-between', width: "60%" }}>
                <Typography className="title" variant="subtitle1">New here? <span onClick={props.changeRoute} className="link">Create your account now.</span> </Typography>
                <Typography onClick={handleClickOpen} className="title" variant="subtitle1"><span className="link">Forget Password</span></Typography>
            </div>


        </>
    )
}

export default LoginForm;