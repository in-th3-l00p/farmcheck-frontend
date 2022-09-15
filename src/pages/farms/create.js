import { useState } from "react";
import axios from "axios";
import TextBox from "../../components/textbox/textbox";
import {FileUploader, LabelInput} from "../../components/forms/forms";
import { Button } from "../../components/buttons/buttons";
import ErrorAlert from "../../components/alerts/error";

import {getAuthorizationHeader} from "../../lib/auth";

/**
 * Create Farm page.
 * @returns page at "/createfarm"
 */
export const CreateFarm = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState([]);

    const [error, setError] = useState("");

    const isInputValid = () => {
        return ( !!name && !!image );
    }

    return (
        <TextBox className="form-container">
            <form className="form" onSubmit={(event) => {
                event.preventDefault();
                axios.post(
                    "/api/farms",
                    { name, image },
                    { headers: getAuthorizationHeader() }
                )
                    .then(_resp => {
                        window.location.href = "/farms?created";
                    })
                    .catch(err => {
                        switch (err.code) {
                            case "ERR_BAD_REQUEST":
                                setError(err.response.data.title);
                                break;
                            default:
                                setError("Server error");
                                break;
                        }
                })
            }}>
                <h2 className="text-center mb-4">Create Farm</h2>
                <ErrorAlert error={error} setError={setError} />

                <span className="input-container">
                    <LabelInput
                        label="Farm name:"
                        value={name}
                        setValue={setName}
                    />
                </span>

                <FileUploader setBlob={setImage} />

                <span className="d-flex justify-content-center">
                    <Button 
                        type="submit"
                        disabled={!isInputValid()}
                        style={{width: "150px"}}
                    >
                        Submit
                    </Button>
                </span>
            </form>
        </TextBox>
    )
}