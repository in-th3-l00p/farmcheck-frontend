/**
 * Page component at "/sensors/create/:farm-id". Used for creating a new component.
 * @return {JSX.Element} the page component
 */
import {useParams} from "react-router-dom";
import {useState} from "react";
import sensorService from "../../../lib/services/sensorService";
import ErrorAlert from "../../../components/alerts/error";
import {LabelInput, LabelTextInput} from "../../../components/forms/forms";
import {Button} from "../../../components/buttons/buttons";

import style from "../styles/panel.module.scss";

const CreateSensor = () => {
    const params = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");

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
                    sensorService
                        .createSensor(params["farm_id"], name, description)
                        .then(
                            () =>
                                (window.location.href = `/farms/panel/${params["farm_id"]}?sensorAdded`)
                        )
                        .catch((err) => setError(err.message));
                }}
            >
                <h2 className="mb-4 text-center">Create sensor</h2>
                {error && <ErrorAlert error={error} setError={setError} />}
                <span className="input-container">
                    <LabelInput
                        label="Sensor name:"
                        value={name}
                        setValue={setName}
                    />
                    <LabelTextInput
                        label="Sensor description:"
                        inputStyle={{ height: "200px" }}
                        value={description}
                        setValue={setDescription}
                    />
                </span>

                <span className="d-flex justify-content-center">
                    <Button type="submit" className={style.button}>
                        Submit
                    </Button>
                </span>
            </form>
        </div>
    );
};

export default CreateSensor;