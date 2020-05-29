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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = (props) => {
    const [openForget, setOpenForget] = React.useState(false);
    const [resetEmail, setResetEmail] = useState("")
    const [resetDisable, setResetDisable] = useState(true);

    const handleClickOpen = () => {
        setOpenForget(true);
    };

    const handleClose = () => {
        setOpenForget(false);
    };

    const {
        values: { email, password },
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
                    name="email"
                    label="Your Email Address"
                    variant="outlined"
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    value={email}
                    onChange={change.bind(null, "email")}
                />
                <TextField
                    type="password"
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    onChange={change.bind(null, "password")}
                    value={password}
                    style={{ width: "100%", marginBottom: 36 }}
                    name="password"
                    label="Your Password"
                    variant="outlined"
                />

                <Button disabled={(errors.email || errors.password || email === "" || password === "") ? true : false} variant="contained" color="primary" style={{ width: "100%", height: 44 }}>login</Button>
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