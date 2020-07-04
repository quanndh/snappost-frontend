import React, { useState, useEffect } from 'react';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { Paper, Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import DataService from '../../network/DataService';
import helper from '../../services/Helper/helper';
import ApiService from '../../services/ApiService/ApiService';

const PersonalInformation = ({ company, school, currentLocation, bornIn, handleUpdateUserCB, isMe }) => {

    const [openEdit, setOpenEdit] = useState(false)

    const [info, setInfo] = useState({
        company: company,
        school: school,
        currentLocation: currentLocation,
        bornIn: bornIn
    })

    useEffect(() => {
        setInfo({
            company: company,
            school: school,
            currentLocation: currentLocation,
            bornIn: bornIn
        })
    }, [])

    const handleChange = (e) => {
        let temp = { ...info };
        temp[e.target.name] = e.target.value;
        setInfo(temp)
    }

    const handleUpdateUser = async () => {
        let rs = await DataService.updateUserInfo({ ...info })
        if (rs.code == 0) {
            setOpenEdit(false);
            handleUpdateUserCB({ ...info })
            helper.activateToast("default", rs.message);
        }
    }

    return (
        <>
            <Dialog style={{ zIndex: 1000 }} maxWidth="sm" fullWidth={true} open={openEdit} onClose={() => setOpenEdit(false)} aria-labelledby="user-info-form">
                <DialogTitle>Edit information</DialogTitle>
                <DialogContent>
                    <FormControl style={{ marginBottom: 16 }} fullWidth variant="outlined">
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
                    <FormControl style={{ marginBottom: 16 }} fullWidth variant="outlined">
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
                    <FormControl style={{ marginBottom: 16 }} fullWidth variant="outlined">
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
                    <FormControl style={{ marginBottom: 16 }} fullWidth variant="outlined">
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
                    <Button onClick={handleUpdateUser} style={{ marginBottom: 16 }} color="primary" fullWidth variant="contained">Save</Button>
                </DialogContent>
            </Dialog>
            <Paper elevation={0} className="personal-information-container">
                {
                    !company && !school && !currentLocation && !bornIn ? (
                        <Typography variant="subtitle1" align="center">Fill in so more people can recognize you.</Typography>
                    ) : null
                }
                {
                    company ? (
                        <div>
                            <WorkOutlineOutlinedIcon />
                            <p>Work at {company}</p>
                        </div>
                    ) : null
                }

                {
                    school ? (
                        <div>
                            <SchoolOutlinedIcon />
                            <p>Learn at {school}</p>
                        </div>
                    ) : null
                }


                {
                    currentLocation ? (
                        <div>
                            <HomeOutlinedIcon />
                            <p>Live in {currentLocation}</p>
                        </div>
                    ) : null
                }

                {
                    bornIn ? (
                        <div>
                            <RoomOutlinedIcon />
                            <p>Come form {bornIn}</p>
                        </div>
                    ) : null
                }

                <div className="primary-button" onClick={isMe ? () => setOpenEdit(true) : null}>
                    <span>Change information</span>
                </div>

            </Paper>
        </>
    )
}

export default PersonalInformation;