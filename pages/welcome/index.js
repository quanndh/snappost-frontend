import React from 'react';
import { Paper, Typography, Avatar, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const Welcome = ({ user, isDark }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['First impression', 'Major infomation', 'Create an ad'];

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
                            onChange={null}
                        />
                        <span>Set avatar and nickname so people can recognize you</span>
                        <div style={{ position: 'relative', marginTop: 16 }}>
                            <Avatar src={user.avatar} style={{ width: 200, height: 200 }} />
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
                                        <CameraAltIcon />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="stepper-item">

                    </div>
                )
            case 2:
                return (
                    <div className="stepper-item">

                    </div>
                )
            default:
                return null
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
                    {getStepContent(activeStep)}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        isDark: state.uiReducer.isDark
    }
}

export default connect(mapStateToProps)(Welcome);