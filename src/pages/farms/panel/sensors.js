import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button } from "../../../components/buttons/buttons";
import ErrorAlert from "../../../components/alerts/error";
import sensorService from "../../../lib/services/sensorService";

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
