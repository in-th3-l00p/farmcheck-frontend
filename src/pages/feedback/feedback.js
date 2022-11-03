import axios from "axios";
import React, { useState } from "react";
import { Button } from "../../components/buttons/buttons";
import { LabelInput, LabelTextInput } from "../../components/forms/forms";
import ErrorAlert from "../../components/alerts/error";

import style from "./feedback.module.scss";

const FeedBack = () => {
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(undefined);

    return (
        <form
            className={style.feedBack}
            onSubmit={(e) => {
                e.preventDefault();

                axios
                    .post("/api/feedback", {
                        email: email,
                        content: content,
                    })
                    .catch((err) => setError(err));

                window.location.href = "/";
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: 30 }}>Feedback</h2>
            {error && <ErrorAlert error={error} setError={setError} />}
            <LabelInput
                label="Email address"
                type="email"
                value={email}
                setValue={setEmail}
            />
            <LabelTextInput
                label="Your feedback:"
                inputStyle={{ height: "200px" }}
                value={content}
                setValue={setContent}
                className="mt-3"
            />
            <span className="d-flex justify-content-center">
                <Button type="submit" className={style.button}>
                    Submit
                </Button>
            </span>
        </form>
    );
};

export default FeedBack;
