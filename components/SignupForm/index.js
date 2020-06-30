import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataService from '../../network/DataService';
import helper from '../../services/Helper/helper';
import Router from 'next/router'
import { Paper } from '@material-ui/core';

const SignupForm = (props) => {

    const [isError, setIsError] = useState(true);
    const [gender, setGender] = useState("0")
    const [isLoading, setIsLoading] = useState(false);

    const {
        values: { firstName, lastName, phone, email, password },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
        if (firstName === "" || lastName === "" || phone === "" || email === "" || password === "" || errors.firstName || errors.lastName || errors.phone || errors.email || errors.password) {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }

    const handleSubmit = async () => {
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            phone,
            gender
        }
        setIsLoading(true)
        let rs = await DataService.signup(newUser);
        setIsLoading(false);
        if (rs.code !== 0) {
            helper.activateToast("error", rs.message)
        } else {
            ApiService.login(rs.data, rs.token)
            // Router.push("/")
        }
    }

    return (
        <>
            <Typography className="title" variant="subtitle1">Become a member of Snappost</Typography>
            <br />
            <Paper className="form-container">
                <Paper style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TextField
                        name="firstName"
                        helperText={touched.firstName ? errors.firstName : ""}
                        error={touched.firstName && Boolean(errors.firstName)}
                        value={firstName}
                        onChange={change.bind(null, "firstName")}
                        style={{ width: "45%" }}
                        label="First Name"
                        variant="outlined"
                    />

                    <TextField
                        name="lastName"
                        helperText={touched.lastName ? errors.lastName : ""}
                        error={touched.lastName && Boolean(errors.lastName)}
                        value={lastName}
                        onChange={change.bind(null, "lastName")}
                        style={{ width: "45%" }}
                        label="Last Name"
                        variant="outlined"
                    />
                </Paper>
                <TextField
                    name="phone"
                    helperText={touched.phone ? errors.phone : ""}
                    error={touched.phone && Boolean(errors.phone)}
                    value={phone}
                    onChange={change.bind(null, "phone")}
                    style={{ width: "100%", marginBottom: 20 }}
                    label="Your Phone Number"
                    variant="outlined"
                />
                <RadioGroup style={{ width: "100%", marginBottom: 20 }} row aria-label="gender" name="gender1" value={gender} onChange={e => setGender(e.target.value)}>
                    <FormControlLabel value="0" control={<Radio color="primary" />} label="Female" />
                    <FormControlLabel value="1" control={<Radio color="primary" />} label="Male" />
                    <FormControlLabel value="2" control={<Radio color="primary" />} label="Other" />
                </RadioGroup>
                <TextField
                    name="email"
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    value={email}
                    onChange={change.bind(null, "email")}
                    style={{ width: "100%", marginBottom: 20 }}
                    label="Your Email Address"
                    variant="outlined"
                />
                <TextField
                    name="password"
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    value={password}
                    onChange={change.bind(null, "password")}
                    style={{ width: "100%", marginBottom: 20 }}
                    label="Your Password"
                    variant="outlined"
                    type="password"
                />

                <Button onClick={handleSubmit} variant="contained" color="primary" style={{ width: "100%", height: 44 }}>
                    {isLoading ? <CircularProgress style={{ color: "white" }} /> : "Begin your adventure"}
                </Button>
            </Paper>

            <br />
            <Typography className="title" variant="subtitle1">Already have account? <span onClick={props.changeRoute} className="link">Login here.</span></Typography>
        </>
    )
}

export default SignupForm;