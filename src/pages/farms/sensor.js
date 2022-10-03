import { useEffect, useState } from "react";
import TextBox from "../../components/textbox/textbox";
import sensorService from "../../lib/services/sensorService";
import { useParams } from "react-router-dom";
import ErrorAlert from "../../components/alerts/error";

import style from "./styles/sensor.module.scss";
import { Button } from "../../components/buttons/buttons";
import { FormControl, Modal } from "react-bootstrap";

const SensorPagePlaceholder = () => {
    return (
        <TextBox className="form-container">
            <p>loading...</p>
        </TextBox>
    );
};

const DeleteSensorModal = ({ sensor, setError, show, setShow }) => {
    const [confirmationInput, setConfirmationInput] = useState("");

    return (
        <Modal
            style={{ top: "25%" }}
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
                    Are you sure you want to delete sensor <b>{sensor.name}</b>.
                    <br />
                    Enter the username of the user to confirm:
                </p>
                <FormControl
                    value={confirmationInput}
                    onChange={(event) =>
                        setConfirmationInput(event.target.value)
                    }
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className={`${style.button} bg-danger text-white`}
                    disabled={confirmationInput !== sensor.name}
                    onClick={() => {
                        sensorService
                            .deleteSensor(sensor.id)
                            .then(() => (window.location.href = "/farms/"))
                            .catch((err) => {
                                setError(err.message);
                                setConfirmationInput("");
                                setShow(false);
                            });
                    }}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

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
            <h4 className={style.title}>
                {sensorData.dateTime
                    .replace(/T/g, " ")
                    .replace(/\..*/g, "")
                    .replace("-", ".")
                    .replace("-", ".")
                    .slice(0, -3)}
            </h4>
            {open && (
                <div className="mt-2 d-flex flex-column gap-3">
                    <p className={style.items}>
                        Soil humidity: {sensorData.soilHumidity}%
                    </p>
                    <p className={style.items}>
                        Air humidity: {sensorData.airHumidity}%
                    </p>
                    <p className={style.items}>
                        Soil temperature: {sensorData.soilTemperature}°C
                    </p>
                    <p className={style.items}>
                        Air temperature: {sensorData.airTemperature}°C
                    </p>
                </div>
            )}
        </span>
    );
};

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
        sensorService
            .getSensor(params["sensor_id"])
            .then((sensorData) => setSensor(sensorData))
            .catch((err) => setError(err.message));
        sensorService
            .getSensorDataList(params["sensor_id"])
            .then((sensorDataList) => setSensorDataList(sensorDataList))
            .catch((err) => setError(err.message));
    }, []);

    if (sensor === null || sensorDataList === null)
        return <SensorPagePlaceholder />;
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
            <div className={`${style.textBox} form-container`}>
                {error && <ErrorAlert error={error} setError={setError} />}
                <h3 className="">
                    Sensor name: <b>{sensor.name}</b>
                </h3>
                {sensor.description !== "" ? (
                    <h5
                        style={{ fontWeight: 400 }}
                        className={style.description}
                    >
                        {sensor.description}
                    </h5>
                ) : (
                    <></>
                )}
                <h5 style={{ marginTop: 15, marginBottom: 15 }}>
                    Token: {sensor.token}
                </h5>

                <h4>Recent sensor data:</h4>
                {sensorDataList.length !== 0 ? (
                    <div
                        className={`${style.sensorData} mt-2 d-flex flex-column gap-3`}
                    >
                        <div className="d-flex">
                            <img
                                alt="sensorDataIcon"
                                src="/images/sensor-images/soilHumidity.png"
                                className={style.sensorIconSoil}
                            />
                            <p>
                                Soil humidity:{" "}
                                {
                                    sensorDataList[sensorDataList.length - 1]
                                        .soilHumidity
                                }
                                %
                            </p>
                        </div>
                        <div className="d-flex">
                            <img
                                alt="sensorDataIcon"
                                src="/images/sensor-images/airHumidity.png"
                                className={style.sensorIconAir}
                            />
                            <p>
                                Air humidity:{" "}
                                {
                                    sensorDataList[sensorDataList.length - 1]
                                        .airHumidity
                                }
                                %
                            </p>
                        </div>
                        <div className="d-flex">
                            <img
                                alt="sensorDataIcon"
                                src="/images/sensor-images/soilTemperature.png"
                                className={style.sensorIconSoil}
                            />
                            <p>
                                Soil temperature:{" "}
                                {
                                    sensorDataList[sensorDataList.length - 1]
                                        .soilTemperature
                                }
                                °C
                            </p>
                        </div>
                        <div className="d-flex">
                            <img
                                alt="sensorDataIcon"
                                src="/images/sensor-images/airTemperature.png"
                                className={style.sensorIconAir}
                            />
                            <p>
                                Air temperature:{" "}
                                {
                                    sensorDataList[sensorDataList.length - 1]
                                        .airTemperature
                                }
                                °C
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className={style.error}>No data collected. </p>
                )}

                {sensorDataList.length !== 0 ? <h4>Sensor data:</h4> : <></>}

                <div className="d-flex flex-column gap-3">
                    {sensorDataList
                        .slice(0)
                        .reverse()
                        .map((sensorData, index) => (
                            <SensorDataDisplay
                                key={index}
                                sensorData={sensorData}
                            />
                        ))}
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <Button
                        className={`${style.button} bg-danger text-white`}
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete sensor
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SensorPage;
