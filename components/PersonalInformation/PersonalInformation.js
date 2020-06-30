import React, { useState } from 'react';
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


const PersonalInformation = ({ profile }) => {

    const [openEdit, setOpenEdit] = useState(false)
    const [info, setInfo] = useState({
        company: profile?.company,
        school: profile?.school,
        currentLocation: profile?.currentLocation,
        bornIn: profile?.bornIn
    })

    return (
        <>
            <Dialog style={{ zIndex: 1000 }} maxWidth="sm" fullWidth={true} open={openEdit} onClose={() => setOpenEdit(false)} aria-labelledby="user-info-form">
                <DialogTitle>Edit information</DialogTitle>
                <DialogContent>
                    <FormControl style={{ marginBottom: 16 }} fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Company</InputLabel>
                        <OutlinedInput
                            value={info?.company}
                            onChange={null}
                            startAdornment={<InputAdornment position="start"><WorkOutlineOutlinedIcon /></InputAdornment>}
                            labelWidth={60}
                        />
                    </FormControl>
                    <FormControl style={{ marginBottom: 16 }} fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">School</InputLabel>
                        <OutlinedInput
                            value={info?.school}
                            onChange={null}
                            startAdornment={<InputAdornment position="start"><SchoolOutlinedIcon /></InputAdornment>}
                            labelWidth={60}
                        />
                    </FormControl>
                    <FormControl style={{ marginBottom: 16 }} fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Current location</InputLabel>
                        <OutlinedInput
                            value={info?.currentLocation}
                            onChange={null}
                            startAdornment={<InputAdornment position="start"><HomeOutlinedIcon /></InputAdornment>}
                            labelWidth={60}
                        />
                    </FormControl>
                    <FormControl style={{ marginBottom: 16 }} fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Borned in</InputLabel>
                        <OutlinedInput
                            value={info?.bornIn}
                            onChange={null}
                            startAdornment={<InputAdornment position="start"><RoomOutlinedIcon /></InputAdornment>}
                            labelWidth={60}
                        />
                    </FormControl>
                    <Button style={{ marginBottom: 16 }} color="primary" fullWidth variant="contained">Save</Button>
                </DialogContent>
            </Dialog>
            <Paper elevation={0} className="personal-information-container">
                {
                    !info?.company && !info?.school && !info?.currentLocation && !info?.bornIn ? (
                        <Typography variant="subtitle1" align="center">Fill in so more people can recognize you.</Typography>
                    ) : null
                }
                {
                    info?.company ? (
                        <div>
                            <WorkOutlineOutlinedIcon />
                            <p>Working at {info?.company}</p>
                        </div>
                    ) : null
                }

                {
                    info?.school ? (
                        <div>
                            <SchoolOutlinedIcon />
                            <p>Graduated at {info?.school}</p>
                        </div>
                    ) : null
                }


                {
                    info?.currentLocation ? (
                        <div>
                            <HomeOutlinedIcon />
                            <p>Currently living in {info?.currentLocation}</p>
                        </div>
                    ) : null
                }

                {
                    info?.bornIn ? (
                        <div>
                            <RoomOutlinedIcon />
                            <p>Borned in {info?.bornIn}</p>
                        </div>
                    ) : null
                }

                <div className="primary-button" onClick={() => setOpenEdit(true)}>
                    <span>Change information</span>
                </div>

            </Paper>
        </>
    )
}

export default PersonalInformation;