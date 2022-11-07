import {useParams} from "react-router-dom";

import style from "../styles/panel.module.scss";
import {useState} from "react";
import ErrorAlert from "../../../components/alerts/error";
import {LabelInput} from "../../../components/forms/forms";
import {Button} from "../../../components/buttons/buttons";
import messageService from "../../../lib/services/messageService";

const CreateChat = () => {
    const params = useParams();
    const [name, setName] = useState("");
    const [error, setError] = useState();

    if (!params["farm_id"])
        return (
            <div
                className={"d-flex align-items-center justify-content-center"}
                style={{ width: "100vw", height: "100vh" }}
            >
                <h1>
                    You need to provide a id for the farm where the sensor will
                    be added
                </h1>
            </div>
        );
    return (
        <div className={`${style.textBox} form-container`}>
            <form
                className="form"
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <h2 className="mb-4 text-center">Create chat room</h2>
                {error && <ErrorAlert error={error} setError={setError} />}
                <span className="input-container">
                    <LabelInput
                        label="Chat room name:"
                        value={name}
                        setValue={setName}
                    />
                </span>

                <span className="d-flex justify-content-center">
                    <Button
                        onClick={() =>
                            messageService.createChatRoom(params["farm_id"], name)
                                .then(() => window.location.href = "/farms")
                        }
                        type="submit"
                        className={style.button}
                    >
                        Submit
                    </Button>
                </span>
            </form>
        </div>
    );
}

export default CreateChat;