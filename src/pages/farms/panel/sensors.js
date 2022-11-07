import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button } from "../../../components/buttons/buttons";
import ErrorAlert from "../../../components/alerts/error";
import { LabelInput, LabelTextInput } from "../../../components/forms/forms";
import sensorService from "../../../lib/services/sensorService";
import { useParams } from "react-router-dom";

import style from "../styles/panel.module.scss";

/**
 * Used while fetching from the server.
 * @return {JSX.Element} the placeholder component
 */
const SensorsTabPlaceholder = () => {
    return (
        <Container>
            <p>loading...</p>
        </Container>
    );
};

/**
 * Page component at "/sensors/create/:farm-id". Used for creating a new component.
 * @return {JSX.Element} the page component
 */
export const CreateSensor = () => {
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
                    <Button
                        type="submit"
                        className={style.button}
                        disabled={!name.length}
                    >
                        Submit
                    </Button>
                </span>
            </form>
        </div>
    );
};

/**
 * Tab used for displaying sensors.
 * @param farm farm entity
 * @param users list of users
 * @return {JSX.Element} the tab component
 */
const SensorsTab = ({ farm, users }) => {
    const [sensors, setSensors] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {
        sensorService
            .getSensors(farm.id)
            .then((sensorList) => setSensors(sensorList))
            .catch((err) => setError(err.message));
    }, []);

    if (farm === undefined || users === undefined || sensors === null)
        return <SensorsTabPlaceholder />;
    return (
        <Container className={"w-100"}>
            {error && <ErrorAlert error={error} setError={setError} />}
            <div className="text-end">
                <Button
                    onClick={() =>
                        (window.location.href = `/sensors/create/${farm.id}`)
                    }
                    className={style.createButton}
                >
                    <span className={style.buttonText}>+</span>
                </Button>
            </div>
            <div
                className="d-flex flex-column gap-3"
                style={{overflowY: "scroll", maxHeight: "38vh"}}
            >
                {sensors.map((sensor, index) => (
                    <span
                        key={index}
                        className={style.elementDisplay}
                        onClick={() =>
                            (window.location.href = `/sensors/${sensor.id}`)
                        }
                    >
                        <h4 style={{ marginTop: 8 }}>{sensor.name}</h4>
                    </span>
                ))}
            </div>
        </Container>
    );
};

export default SensorsTab;
