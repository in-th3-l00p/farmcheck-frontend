import {useState} from "react";
import {Container, Form, Modal} from "react-bootstrap";
import {Button} from "../../../components/buttons/buttons";
import {FileUploader} from "../../../components/forms/forms";
import ErrorAlert from "../../../components/alerts/error";
import farmService from "../../../lib/services/farmService";

/**
 * Used while waiting for the farm data to be fetched.
 * @return {JSX.Element} placeholder component
 */
const SettingsTabPlaceholder = () => {
    return (
        <Container>

        </Container>
    );
}

/**
 * Modal that is used for confirming if the farm should be deleted or not.
 * @param show state that controls if the modal should appear on the screen
 * @param setShow show state's reducer
 * @param setError error state's reducer
 * @param farm farm object
 * @return {JSX.Element} the component
 */
const DeleteFarmConfirmationModal = ({ show, setShow, setError, farm }) => {
    const [farmNameInput, setFarmNameInput] = useState("");
    const [deleting, setDeleting] = useState(false);

    return (
        <Modal
            show={show}
            onHide={() => {
                if (!deleting)
                    setShow(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    If you really want to delete farm
                    <b>{` "${farm.name}"`}</b>,
                    write the name of the farm:
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
                        setDeleting(true);
                        farmService.deleteFarm(farm.id)
                            .then(() => window.location.href = "/farms?deleted")
                            .catch((err) => setError(err.message))
                            .finally(() => {
                                setDeleting(false);
                                setShow(false);
                                setFarmNameInput("");
                            })
                    }}
                    className="bg-danger text-white fw-bolder"
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

/**
 * Tab used for viewing/changing farm's settings.
 * @param farm the farm object
 * @param users farm's users
 * @return {JSX.Element} the tab component
 */
const SettingsTab = ({ farm, users }) => {
    const [inputFarmName, setInputFarmName] = useState(farm.name);
    const [inputFarmImage, setInputFarmImage] = useState(farm.image);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState("");

    if (
        typeof farm === "undefined" ||
        typeof users === "undefined"
    )
        return <SettingsTabPlaceholder />
    return (
        <>
            <DeleteFarmConfirmationModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                setError={setError}
                farm={farm}
            />
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                    farmService.updateFarm(farm.name, inputFarmName)
                        .then(() => window.location.href = `/farms/panel/${inputFarmName}?updated`)
                        .catch(err => setError(err.message));
                }}
            >
                <Container className="d-flex flex-column gap-3">
                    {error && <ErrorAlert error={error} setError={setError} />}
                    <Form.Group>
                        <Form.Label>Farm name:</Form.Label>
                        <Form.Control
                            value={inputFarmName}
                            onChange={(event) => setInputFarmName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Farm image:</Form.Label>
                        <FileUploader
                            setBlob={setInputFarmImage}
                        />
                    </Form.Group>

                    <div className="center gap-5">
                        <Button type="submit">Save changes</Button>
                        <Button
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-danger text-white"
                        >
                            Delete farm
                        </Button>
                    </div>
                </Container>
            </Form>
        </>
    )
}

export default SettingsTab;