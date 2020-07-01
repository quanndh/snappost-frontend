import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import helper from '../../services/Helper/helper';
import DataService from '../../network/DataService';

const PersonalDescription = ({ bio, handleUpdateUserCB, isMe }) => {

    const [isAddDescription, setIsAddDescription] = useState(false);
    const [length, setLenght] = useState(100);
    const [desc, setDesc] = useState(bio);

    useEffect(() => {
        setDesc(bio)
        setLenght(100 - bio.length);
    }, [])

    const handleChange = (e) => {
        if (e.target.value.length <= 100) {
            setDesc(e.target.value)
            setLenght(100 - e.target.value.length)
        }
    }

    const handleUpdateUser = async () => {
        let rs = await DataService.updateUserInfo({ bio: desc })
        if (rs.code == 0) {
            setIsAddDescription(false);
            handleUpdateUserCB({ bio: desc })
            helper.activateToast("default", rs.message);
        }
    }

    return (
        <div className="personal-description-container">
            <br />
            {
                !isAddDescription ? (
                    <div>
                        <Typography variant="h6" align="center">
                            {
                                desc ? desc : "Create a short description for people to understand you."
                            }
                        </Typography>
                        <br />
                        <div
                            className="primary-button"
                            onClick={isMe ? () => setIsAddDescription(true) : null}
                        >
                            <span>{desc ? "Change description" : "Add description"}</span>
                        </div>
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
                                    <Button
                                        style={{ marginLeft: 10 }}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdateUser}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>

                    )
            }

        </div>
    )
}

export default PersonalDescription;