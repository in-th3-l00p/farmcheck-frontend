import {useEffect, useState} from "react";
import TextBox from "../../components/textbox/textbox";
import sensorService from "../../lib/services/sensorService";
import {useParams} from "react-router-dom";
import ErrorAlert from "../../components/alerts/error";

import style from "./styles/sensor.module.scss";
import {Button} from "../../components/buttons/buttons";
import {FormControl, Modal} from "react-bootstrap";

const SensorPagePlaceholder = () => {
    return (
        <TextBox className="form-container">
            <p>loading...</p>
        </TextBox>
    );
}

const DeleteSensorModal = ({ sensor, setError, show, setShow }) => {
    const [confirmationInput, setConfirmationInput] = useState("");

    return (
        <Modal
            show={show}
            onHide={() => {
                setConfirmationInput("");
                setShow(false);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete sensor <b>{sensor.name}</b>.<br />
                    Enter the username of the user to confirm:
                </p>
                <FormControl
                    value={confirmationInput}
                    onChange={(event) => setConfirmationInput(event.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={confirmationInput !== sensor.name}
                    onClick={() => {
                        sensorService.deleteSensor(sensor.id)
                            .then(() => window.location.href = "/farms/")
                            .catch(err => {
                                setError(err.message);
                                setConfirmationInput("");
                                setShow(false);
                            })
                    }}
                    className="fw-bolder bg-danger text-white"
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

/**
 * Component used for displaying informations about a sensor data.
 * @param sensorData the sensor data object
 * @return {JSX.Element} the component visualizer
 */
const SensorDataDisplay = ({ sensorData }) => {
    const [open, setOpen] = useState(false);

    return (
        <span
            className={style.sensorDataDisplay}
            onClick={() => setOpen(!open)}
        >
            <h4>{
                sensorData
                    .dateTime
                    .replace(/T./g, " ")
            }</h4>
            {open && (
                <div className="mt-2 d-flex flex-column gap-3">
                    <p>Soil humidity: {sensorData.soilHumidity}</p>
                    <p>Air humidity: {sensorData.airHumidity}</p>
                    <p>Soil temperature: {sensorData.soilTemperature}</p>
                    <p>Air temperature: {sensorData.airTemperature}</p>
                </div>
            )}
        </span>
    );
}

/**
 * Component used at page "/sensor/:sensor_id". Used for visualizing a sensor.
 * @return {JSX.Element} the page component
 */
const SensorPage = () => {
    const params = useParams();

    const [sensor, setSensor] = useState(null);
    const [sensorDataList, setSensorDataList] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        sensorService.getSensor(params["sensor_id"])
            .then(sensorData => setSensor(sensorData))
            .catch(err => setError(err.message));
        sensorService.getSensorDataList(params["sensor_id"])
            .then(sensorDataList => setSensorDataList(sensorDataList))
            .catch(err => setError(err.message));
    }, [])

    if (
        sensor === null ||
        sensorDataList === null
    )
        return <SensorPagePlaceholder />
    return (
        <>
            {showDeleteModal && (
                <DeleteSensorModal
                    show={showDeleteModal}
                    setShow={setShowDeleteModal}
                    setError={setError}
                    sensor={sensor}
                />
            )}
            <TextBox className="form-container">
                {error && <ErrorAlert error={error} setError={setError} />}
                <h3 className="text-decoration-underline">Sensor name: <b>{sensor.name}</b></h3>
                <p>Description: {sensor.description}</p>
                <p>Token: {sensor.token}</p>

                <h4>Sensor data:</h4>
                <div className="d-flex flex-column gap-3">
                    {sensorDataList.map((sensorData, index) => (
                        <SensorDataDisplay
                            key={index}
                            sensorData={sensorData}
                        />
                    ))}
                </div>

                <div className="d-flex justify-content-center mt-5">
                    <Button
                        className="bg-danger text-white"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete sensor
                    </Button>
                </div>
            </TextBox>
        </>
    )
}

export default SensorPage;