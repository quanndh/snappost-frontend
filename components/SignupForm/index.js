import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignupForm = (props) => {

    const [isError, setIsError] = useState(true);

    const {
        values: { firstName, lastName, phone, email, password },
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
        if (firstName === "" || lastName === "" || phone === "" || email === "" || password === "" || errors.firstName || errors.lastName || errors.phone || errors.email || errors.password) {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }

    return (
        <>
            <Typography className="title" variant="subtitle1">Become a member of Snappost</Typography>
            <br />
            <div className="form-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 36 }}>
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
                </div>
                <TextField
                    name="phone"
                    helperText={touched.phone ? errors.phone : ""}
                    error={touched.phone && Boolean(errors.phone)}
                    value={phone}
                    onChange={change.bind(null, "phone")}
                    style={{ width: "100%", marginBottom: 36 }}
                    label="Your Phone Number"
                    variant="outlined"
                />
                <TextField
                    name="email"
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    value={email}
                    onChange={change.bind(null, "email")}
                    style={{ width: "100%", marginBottom: 36 }}
                    label="Your Email Address"
                    variant="outlined"
                />
                <TextField
                    name="password"
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    value={password}
                    onChange={change.bind(null, "password")}
                    style={{ width: "100%", marginBottom: 36 }}
                    label="Your Password"
                    variant="outlined"
                />

                <Button disabled={Boolean(isError)} variant="contained" color="primary" style={{ width: "100%", height: 44 }}>Begin your adventure</Button>
            </div>

            <br />
            <Typography className="title" variant="subtitle1">Already have account? <span onClick={props.changeRoute} className="link">Login here.</span></Typography>

        </>
    )
}

export default SignupForm;