import React, { useState, useEffect } from 'react';
import { Paper, Typography, Avatar, IconButton, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import DataService from '../../network/DataService';
import CircularProgress from '@material-ui/core/CircularProgress';
import Router from 'next/router';
import helper from '../../services/Helper/helper';
import ApiService from '../../services/ApiService/ApiService';
import AuthComponent from '../../components/AuthComponent/AuthComponent';

const Welcome = ({ user, isDark }) => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [upload, setUpload] = useState(false);
    const [loading, setLoading] = useState(false);

    const [avatar, setAvatar] = useState(user.avatar);
    const [nickname, setNickname] = useState("");

    const [info, setInfo] = useState({
        company: user.company,
        school: user.school,
        currentLocation: user.currentLocation,
        bornIn: user.bornIn
    })

    const steps = ['First impression', 'Major infomation', 'Finishing'];

    useEffect(() => {
        setAvatar(user.avatar)
        setInfo({
            company: user.company,
            school: user.school,
            currentLocation: user.currentLocation,
            bornIn: user.bornIn
        })
    }, [user.id])

    const handleChange = (e) => {
        let temp = { ...info };
        temp[e.target.name] = e.target.value;
        setInfo(temp)
    }

    const handleUpAvatar = async (e) => {
        setUpload(true)
        let rs = await DataService.uploadImage({ data: e.target.files[0], type: "images" })
        setAvatar(rs.data[0].url)
        setUpload(false)
    }

    const handleSaveNewUser = async () => {
        setLoading(true)
        let data = { ...info };
        data.avatar = avatar;
        data.nickname = nickname;
        data.firstUpdate = true;
        let rs = await DataService.updateUserInfo(data);
        setLoading(false)
        if (rs.code == 0) {
            ApiService.login(rs.data, rs.token)
            Router.push("/")
        } else {
            helper.activateToast("default", rs.message)
        }

    }

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div className="stepper-item" style={{ alignItems: "center", display: 'flex', flexDirection: "column" }}>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="initAvatar"
                            multiple
                            type="file"
                            onChange={handleUpAvatar}
                        />
                        <span>Set avatar and nickname so people can recognize you</span>
                        <div style={{ position: 'relative', marginTop: 16, marginBottom: 16 }}>
                            <Avatar src={avatar} style={{ width: 200, height: 200 }} />
                            <div
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1000,
                                    backgroundColor: "rgba(0,0,0, 0.5)",
                                    borderRadius: 100
                                }}>
                                <label htmlFor="initAvatar">
                                    <div className="primary-button">
                                        {
                                            upload ? <CircularProgress /> : <CameraAltIcon />
                                        }
                                    </div>
                                </label>
                            </div>
                        </div>
                        <TextField
                            style={{ width: "100%", textAlign: "center" }}
                            variant="outlined"
                            label="Nickname"
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                        />
                    </div>
                )
            case 1:
                return (
                    <div className="stepper-item" style={{ alignItems: "center", display: 'flex', flexDirection: "column", width: "50%" }}>
                        <span>Fill in this information so we can find people you may know</span>
                        <FormControl style={{ width: "100%", textAlign: "center", marginBottom: 16, marginTop: 16 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Company</InputLabel>
                            <OutlinedInput
                                controls
                                value={info?.company}
                                name="company"
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start"><WorkOutlineOutlinedIcon /></InputAdornment>}
                                labelWidth={60}
                            />
                        </FormControl>
                        <FormControl style={{ width: "100%", textAlign: "center", marginBottom: 16 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">School</InputLabel>
                            <OutlinedInput
                                controls
                                value={info?.school}
                                name="school"
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start"><SchoolOutlinedIcon /></InputAdornment>}
                                labelWidth={60}
                            />
                        </FormControl>
                        <FormControl style={{ width: "100%", textAlign: "center", marginBottom: 16 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Current location</InputLabel>
                            <OutlinedInput
                                controls
                                value={info?.currentLocation}
                                name="currentLocation"
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start"><HomeOutlinedIcon /></InputAdornment>}
                                labelWidth={60}
                            />
                        </FormControl>
                        <FormControl style={{ width: "100%", textAlign: "center", marginBottom: 16 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Borned in</InputLabel>
                            <OutlinedInput
                                controls
                                value={info?.bornIn}
                                name="bornIn"
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start"><RoomOutlinedIcon /></InputAdornment>}
                                labelWidth={60}
                            />
                        </FormControl>
                    </div>
                )
            case 2:
                return (
                    <div style={{ alignItems: "center", display: 'flex', flexDirection: "column", width: "50%" }}>
                        <span>Thank your for using Snappost. We hope you have a great time snapping post.</span>
                    </div>
                )
            default:
                return null
        }
    }

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    return (
        <div
            style={{
                backgroundColor: isDark ? "#18191A" : "#E9EBEE",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: isDark ? "white" : "black",
            }}
        >
            <Typography align="center" className="title" variant="h3">Welcome to Snappost {user.firstName + " " + user.lastName}</Typography>
            <div style={{ backgroundColor: isDark ? "#18191A" : "#E9EBEE", width: "60%" }} className="stepper">
                <Stepper style={{ backgroundColor: isDark ? "#18191A" : "#E9EBEE", width: "100%" }} alternativeLabel activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div style={{ display: "flex", alignItems: "center", marginTop: 24, flexDirection: "column" }}>
                    {getStepContent(activeStep)}

                    <div style={{ marginTop: 28, display: "flex", justifyContent: "space-around", width: "50%" }}>
                        <Button color="secondary" disabled={activeStep == 0} variant="contained" onClick={handleBack}>Go back</Button>
                        {
                            activeStep < steps.length - 1 ? (
                                <Button color="primary" variant="contained" onClick={handleNext}>Next</Button>
                            ) : <Button color="primary" variant="contained" onClick={handleSaveNewUser}>Snap now</Button>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        isDark: state.uiReducer.isDark
    }
}

export default AuthComponent(connect(mapStateToProps)(Welcome));