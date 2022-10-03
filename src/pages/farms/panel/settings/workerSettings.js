import { useState } from "react";
import { Container, Form, Modal } from "react-bootstrap";
import { Button } from "../../../../components/buttons/buttons";
import userService from "../../../../lib/services/userService";
import ErrorAlert from "../../../../components/alerts/error";

import style from "./../../styles/panel.module.scss";

/**
 * Used while waiting for the farm data to be fetched.
 * @return {JSX.Element} placeholder component
 */
const SettingsTabPlaceholder = () => {
    return <Container></Container>;
};

/**
 * Modal that is used for confirming if the user want to exit the farm or not.
 * @param show state that controls if the modal should appear on the screen
 * @param setShow show state's reducer
 * @param setError error state's reducer
 * @param farm farm object
 * @return {JSX.Element} the component
 */
const ExitConfirmationModal = ({ show, setShow, setError, farm }) => {
    const [farmNameInput, setFarmNameInput] = useState("");
    const [exiting, setExiting] = useState(false);

    return (
        <Modal
            show={show}
            onHide={() => {
                if (!exiting) setShow(false);
            }}
            style={{ top: "25%" }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    If you really want to exit farm
                    <b>{` "${farm.name}"`}</b>, write the name of the farm:
                </p>
                <Form.Control
                    value={farmNameInput}
                    onChange={(event) => setFarmNameInput(event.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={farmNameInput !== farm.name}
                    onClick={() => {
                        setExiting(true);
                        userService
                            .exitFarm(farm.id)
                            .then(
                                () => (window.location.href = "/farms?exited")
                            )
                            .catch((err) => setError(err.message))
                            .finally(() => {
                                setExiting(false);
                                setShow(false);
                                setFarmNameInput("");
                            });
                    }}
                    className="bg-danger text-white fw-bolder"
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

/**
 * Worker's tab used for viewing/changing farm's settings.
 * @param farm the farm object
 * @param users farm's users
 * @return {JSX.Element} the tab component
 */
const WorkerSettingsTab = ({ farm, users }) => {
    const [showExitModal, setShowExitModal] = useState(false);
    const [error, setError] = useState("");

    if (typeof farm === "undefined" || typeof users === "undefined")
        return <SettingsTabPlaceholder />;
    return (
        <>
            <ExitConfirmationModal
                show={showExitModal}
                setShow={setShowExitModal}
                setError={setError}
                farm={farm}
            />
            <Form>
                <div className="center gap-5">
                    {error && <ErrorAlert error={error} setError={setError} />}

                    <Button
                        onClick={() => setShowExitModal(true)}
                        className={`${style.button} bg-danger text-white mt-1`}
                    >
                        Exit farm
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default WorkerSettingsTab;
