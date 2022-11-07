import { useState } from "react";
import {
    FileUploader,
    LabelInput,
    LabelTextInput,
} from "../../components/forms/forms";
import { Button } from "../../components/buttons/buttons";
import ErrorAlert from "../../components/alerts/error";

import farmService from "../../lib/services/farmService";
import style from "./styles/farms.module.scss";
import TextBox from "../../components/textbox/textbox";

/**
 * Create Farm page.
 * @returns page at "/createfarm"
 */
const CreateFarm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);

    const [error, setError] = useState("");

    const isInputValid = () => {
        return name && description && !!image;
    };

    return (
        <TextBox className={"mt-100"}>
            <form
                className={`${style.form} form`}
                onSubmit={(event) => {
                    event.preventDefault();
                    farmService
                        .createFarm(name, description)
                        .then(() => (window.location.href = "/farms?created"))
                        .catch((err) => setError(err.message));
                }}
            >
                <h2 className="text-center mb-4">Create Farm</h2>
                <ErrorAlert error={error} setError={setError} />

                <span className="input-container mb-2">
                    <LabelInput
                        label="Farm's name:"
                        value={name}
                        setValue={setName}
                    />
                </span>

                <span className={"input-container mb2"}>
                    <LabelTextInput
                        label={"Farm's description:"}
                        inputStyle={{ height: "20vh" }}
                        value={description}
                        setValue={setDescription}
                    />
                </span>

                <FileUploader setBlob={setImage} />

                <span className="d-flex justify-content-center mt-4">
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

export default CreateFarm;
