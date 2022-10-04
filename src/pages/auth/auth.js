import React, { useEffect, useState } from "react";
import axios from "axios";
import TextBox from "../../components/textbox/textbox";
import {
    CountryInput,
    InputRange,
    LabelInput,
    PhoneNumberInput,
} from "../../components/forms/forms";
import { Alert } from "react-bootstrap";
import ErrorAlert from "../../components/alerts/error";
import { Button } from "../../components/buttons/buttons";

import style from "./auth.module.scss";
import { storeJWT } from "../../lib/auth";

/**
 * Function to return the max number of days based on month and year
 * @returns the correct number of days
 */
const DaysExceptions = (month, year) => {
    const evenMonths = "4, 6, 9, 11";

    if (month === "") return 31;
    else if (evenMonths.includes(month)) return 30;
    else if (month === "2") {
        if (parseInt(year) % 4 === 0) return 29;
        return 28;
    } else return 31;
};

/**
 * Login page.
 * @returns page at "/login"
 */
export const Login = () => {
    // input states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(""); // auth error
    const [registered, setRegistered] = useState(
        new URLSearchParams(window.location.search).get("registered")
    );

    return (
        <TextBox className={`form-container ${style.login}`}>
            <form
                className="form"
                onSubmit={(event) => {
                    event.preventDefault();
                    axios
                        .post("/api/authenticate", {
                            username: username,
                            password: password,
                        })
                        .then((resp) => {
                            if (resp.status === 200) {
                                storeJWT(resp.data.id_token);
                                window.location.href = "/";
                            }
                        })
                        .catch((err) => {
                            switch (err.code) {
                                case "ERR_BAD_REQUEST":
                                    setError(err.response.data.detail);
                                    break;
                                default:
                                    setError("Server error");
                                    break;
                            }
                        });
                }}
            >
                <h2 className="text-center mb-4">Login</h2>

                {/* alerts */}
                {registered !== null && (
                    <Alert
                        variant="success"
                        onClose={() => setRegistered(null)}
                        dismissible
                    >
                        Your account was registered. Activate your account using
                        the mail sent to your email address
                    </Alert>
                )}
                <ErrorAlert error={error} setError={setError} />

                <span className="input-container">
                    <LabelInput
                        label="Username"
                        value={username}
                        setValue={setUsername}
                    />
                    <LabelInput
                        label="Password"
                        type="password"
                        value={password}
                        setValue={setPassword}
                    />

                    <Alert variant="warning" className={style.alert}>
                        Don't have an account.
                        <Alert.Link href="/register" className={style.link}>
                            Register here
                        </Alert.Link>
                    </Alert>
                </span>

                <div className="d-flex justify-content-center gap-2">
                    <Button
                        type="submit"
                        disabled={!username || !password}
                        style={{ width: "150px", fontWeight: 500 }}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </TextBox>
    );
};

/**
 * Register page.
 * @returns page at "/register"
 */
export const Register = () => {
    // providing states for every input of the form
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState({ first: "", last: "" });
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDOB] = useState({ day: "", month: "", year: "" });

    const [error, setError] = useState("");

    // checks if all fields are completed
    const isInputValid = () => {
        return (
            !!email &&
            !!username &&
            !!password &&
            password === confirmPassword &&
            !!name.first &&
            !!name.last &&
            !!country &&
            !!phoneNumber &&
            !!dob.day &&
            !!dob.month &&
            !!dob.year
        );
    };

    // deal with month or year changing
    useEffect(() => {
        const maxDay = DaysExceptions(dob.month, dob.year);
        if (dob.day > maxDay) setDOB({ ...dob, day: maxDay });
    }, [dob]);

    return (
        <TextBox className="form-container">
            <form
                className="form"
                onSubmit={(event) => {
                    event.preventDefault();
                    axios
                        .post("/api/register", {
                            login: username,
                            firstName: name.first,
                            lastName: name.last,
                            email: email,
                            password: password,
                            phoneNumber: phoneNumber,
                            langKey: "en",
                        })
                        .then((resp) => {
                            if (resp.status === 201)
                                window.location.href = "/login?registered";
                        })
                        .catch((err) => {
                            switch (err.code) {
                                case "ERR_BAD_REQUEST":
                                    setError(err.response.data.title);
                                    break;
                                default:
                                    setError("Server error");
                                    break;
                            }
                        });
                }}
            >
                <h2 className="text-center mb-4">Register</h2>
                <ErrorAlert error={error} setError={setError} />

                {/* user's information */}
                <span className="input-container">
                    <LabelInput
                        label="Email address"
                        type="email"
                        value={email}
                        setValue={setEmail}
                    />

                    <LabelInput
                        label="Username"
                        value={username}
                        setValue={setUsername}
                    />

                    <div className="d-flex gap-2">
                        <LabelInput
                            label="First name"
                            className="w-100"
                            value={name.first}
                            setValue={(newName) =>
                                setName({ ...name, first: newName })
                            }
                        />

                        <LabelInput
                            label="Last name"
                            className="w-100"
                            value={name.last}
                            setValue={(newName) =>
                                setName({ ...name, last: newName })
                            }
                        />
                    </div>
                </span>

                {/* password */}
                <span className="input-container">
                    <LabelInput
                        type="password"
                        label="Password"
                        value={password}
                        setValue={setPassword}
                    />

                    <LabelInput
                        type="password"
                        label="Confirm password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                    />

                    {password !== confirmPassword && (
                        <Alert variant="danger" className="mb-0">
                            Passwords don't match.
                        </Alert>
                    )}
                </span>

                {/* date of birth and country */}
                <span className="input-container">
                    <CountryInput value={country} setValue={setCountry} />
                    <PhoneNumberInput
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                    />

                    <div className="d-flex gap-2">
                        <InputRange
                            label="Day"
                            className="w-100"
                            maximum={DaysExceptions(dob.month, dob.year)}
                            value={dob.day}
                            setValue={(newValue) => {
                                setDOB({ ...dob, day: newValue });
                            }}
                        />
                        <InputRange
                            label="Month"
                            className="w-100"
                            maximum={12}
                            value={dob.month}
                            setValue={(newValue) => {
                                setDOB({ ...dob, month: newValue });
                            }}
                        />
                        <InputRange
                            label="Year"
                            className="w-100"
                            maximum={Number.MAX_VALUE}
                            value={dob.year}
                            setValue={(newValue) => {
                                setDOB({ ...dob, year: newValue });
                            }}
                        />
                    </div>

                    <Alert variant="warning" className={style.alert}>
                        Already have an account.
                        <Alert.Link href="/login" className={style.link}>
                            Login here
                        </Alert.Link>
                    </Alert>
                </span>

                <span className="d-flex justify-content-center">
                    <Button
                        type="submit"
                        disabled={!isInputValid()}
                        style={{ width: "150px", fontWeight: 500 }}
                    >
                        Submit
                    </Button>
                </span>
            </form>
        </TextBox>
    );
};
