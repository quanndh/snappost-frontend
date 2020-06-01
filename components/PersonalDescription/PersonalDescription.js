import React, { useState } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';

const PersonalDescription = () => {

    const [isAddDescription, setIsAddDescription] = useState(false);
    const [length, setLenght] = useState(100);
    const [desc, setDesc] = useState("");

    const handleChange = (e) => {
        if (e.target.value.length <= 100) {
            setDesc(e.target.value)
            setLenght(100 - e.target.value.length)
        }
    }

    return (
        <div elevation={0} className="personal-description-container">
            <Typography variant="h5">Description</Typography>
            <br />
            {
                !isAddDescription ? (
                    <div>
                        <Typography variant="subtitle1" align="center">Create a short description for people to understand you.</Typography>
                        <br />
                        <Typography onClick={() => setIsAddDescription(true)} variant="subtitle2" align="center" className="link">Add description</Typography>
                    </div>
                ) : (
                        <div style={{ width: "100%", textAlign: "center", height: "auto" }}>
                            <TextField
                                multiline={true}
                                placeholder="Describe about you"
                                variant="outlined"
                                rowsMax={4}
                                autoFocus={true}
                                onChange={handleChange}
                                style={{ width: "100%", height: "auto" }}
                                value={desc}
                            />
                            <div
                                style={{
                                    height: "auto",
                                    backgroundColor: "rgba(134, 133, 133, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    paddingRight: 10,
                                    paddingBottom: 6
                                }}
                            >
                                <p style={{ color: "rgba(134, 133, 133, 0.7)" }}>{length}</p>
                                <div>
                                    <Button onClick={() => setIsAddDescription(false)}>Cancel</Button>
                                    <Button style={{ marginLeft: 10 }} variant="contained" color="primary">Save</Button>
                                </div>
                            </div>
                        </div>

                    )
            }

        </div>
    )
}

export default PersonalDescription;