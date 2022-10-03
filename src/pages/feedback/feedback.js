import React, { useState } from "react";
import { Button } from "../../components/buttons/buttons";
import { LabelInput, LabelTextInput } from "../../components/forms/forms";

import style from "./feedback.module.scss";

const FeedBack = () => {
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className={style.feedBack}>
            <h3 style={{ textAlign: "center", marginBottom: 30 }}>Feedback</h3>
            <LabelInput
                label="Email address"
                type="email"
                value={email}
                setValue={setEmail}
            />
            <LabelTextInput
                label="Your feedback:"
                inputStyle={{ height: "200px" }}
                value={description}
                setValue={setDescription}
                className="mt-3"
            />
            <span className="d-flex justify-content-center">
                <Button type="submit" className={style.button}>
                    Submit
                </Button>
            </span>
        </div>
    );
};

export default FeedBack;
