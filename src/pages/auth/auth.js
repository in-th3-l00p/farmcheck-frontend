import React, { useEffect, useState } from "react";
import TextBox from "../../components/textbox/textbox";
import { CountryInput, InputRange, LabelInput } from "../../components/forms/forms";
import { Alert } from "react-bootstrap";
import { Button } from "../../components/buttons/buttons"; 

import style from "./auth.module.scss";

/**
 * Function to return the max number of days based on month and year
 * @returns the correct number of days
 */
const DaysExceptions = (month, year) => {
    const evenMonths = "4, 6, 9, 11";

    if (month === "")
        return 31;
    else if (evenMonths.includes(month))
        return 30;
    else if (month === "2") {
        if (parseInt(year) % 4 === 0)
            return 29;
        return 28; 
    }
    else
        return 31;
}

/**
 * Login page.
 * @returns page at "/login"
 */
export const Login = () => {
    // input states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <TextBox className={style.formContainer}>
            <form className={style.form}>
                <h2 className="text-center mb-3">Login</h2>

                <span className={style.inputContainer}>
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

                    <Alert variant="warning" className="mb-0">
                        Don't have an account. 
                        <Alert.Link href="/register" className="ms-1">Register here</Alert.Link>
                    </Alert>
                </span>

                <div className="d-flex justify-content-center gap-2">
                    <Button>Login</Button>
                </div>
            </form>
        </TextBox>
    )
}

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
    const [name, setName] = useState({first: "", last: ""});
    const [country, setCountry] = useState("");
    const [dob, setDOB] = useState({day: 1, month: 1, year: 2000});

    // deal with month or year changing
    useEffect(() => {
        const maxDay = DaysExceptions(dob.month, dob.year);
        if (dob.day > maxDay)
            setDOB({...dob, day: maxDay});
    }, [dob])

    return (
        <TextBox className={style.formContainer}>
            <form className={style.form}>
                <h2 className="text-center mb-3">Register</h2>

                {/* user's informations */}
                <span className={style.inputContainer}>
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
                            setValue={(newName) => setName(
                                {...name, first: newName}
                            )}
                        />

                        <LabelInput 
                            label="Last name"
                            className="w-100"
                            value={name.last}
                            setValue={(newName) => setName(
                                {...name, last: newName}
                            )}
                        />
                    </div>
                </span>

                {/* password */}
                <span className={style.inputContainer}>
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

                    {password !== confirmPassword && 
                        <Alert variant="danger" className="mb-0">
                            Passwords don't match.
                        </Alert>
                    }
                </span>

                {/* date of birth and country */}
                <span className={style.inputContainer}>
                    <CountryInput 
                        value={country} 
                        setValue={setCountry} 
                    />

                    <div className="d-flex gap-2">
                        <InputRange 
                            label="Day"
                            className="w-100"
                            maximum={DaysExceptions(dob.month, dob.year)}
                            value={dob.day}
                            setValue={(newValue) => {
                                setDOB({...dob, day: newValue});
                            }}
                        />
                        <InputRange 
                            label="Month"
                            className="w-100"
                            maximum={12}
                            value={dob.month}
                            setValue={(newValue) => {
                                setDOB({...dob, month: newValue});
                            }}
                        />
                        <InputRange 
                            label="Year"
                            className="w-100"
                            maximum={Number.MAX_VALUE}
                            value={dob.year}
                            setValue={(newValue) => {
                                setDOB({...dob, year: newValue});
                            }}
                        />
                    </div>
                </span>

                {/* todo: create a main button component */}
                <span className="d-flex justify-content-center">
                    <Button>Submit</Button>
                </span>
            </form>
        </TextBox>
    );
}
