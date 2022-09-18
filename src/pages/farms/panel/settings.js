import {useState} from "react";
import axios from "axios";
import {Container, Form, Modal} from "react-bootstrap";
import {Button} from "../../../components/buttons/buttons";
import {FileUploader} from "../../../components/forms/forms";
import {getAuthorizationHeader} from "../../../lib/auth";
import ErrorAlert from "../../../components/alerts/error";

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
 * @param farmName the name of the farm
 * @return {JSX.Element} the component
 */
const DeleteFarmConfirmationModal = ({ show, setShow, setError, farmName }) => {
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
                    <b>{` "${farmName}"`}</b>,
                    write the name of the farm:
                </p>
                <Form.Control
                    value={farmNameInput}
                    onChange={(event) => setFarmNameInput(event.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={farmNameInput !== farmName}
                    onClick={() => {
                        setDeleting(true);
                        axios.delete(
                            "/api/farms/delete",
                            {
                                headers: getAuthorizationHeader(),
                                params: { farmName: farmName }
                            }
                        )
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
                farmName={farm.name}
            />
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                    axios.put(
                        "/api/farms/update",
                        {
                            name: inputFarmName,
                        },
                        {
                            headers: getAuthorizationHeader(),
                            params: { farmName: farm.name }
                        }
                    )
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