import {useState} from "react";
import {Col, Container, FormControl, Modal, Row, Table} from "react-bootstrap";
import {Button} from "../../../components/buttons/buttons";
import ErrorAlert from "../../../components/alerts/error";

/**
 * Used while waiting for the farm data to be fetched.
 * @return {JSX.Element} placeholder component
 */
const UsersTabPlaceholder = () => {
    return (
        <Container>

        </Container>
    );
}

/**
 * Component used for displaying a user inside the users table.
 * @param user user object
 * @param setShowRemoveUserModal state's reducer for showing the confirmation modal for removing a user
 * @param setRemoveUser reducer for the user's object that is trying to be removed
 * @return {JSX.Element} the component
 */
const UserDisplay = ({ user, setShowRemoveUserModal, setRemoveUser }) => {
    return (
        <tr>
            <td>{user.login}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>nu inca</td>

            {/*control buttons*/}
            <td>
                <Container>
                    <Row md>
                        <Col className="text-center my-1">
                            <Button
                                onClick={() => {
                                    setRemoveUser(user);
                                    setShowRemoveUserModal(true);
                                }}
                            >
                                remove
                            </Button>
                        </Col>
                        <Col className="text-center my-1">
                            <Button>change role</Button>
                        </Col>
                    </Row>
                </Container>
            </td>
        </tr>
    )
}

/**
 * Modal user for adding a new user to the current farm.
 * @param show if the modal should appear
 * @param setShow show state's reducer
 * @param setError error state's reducer
 * @return {JSX.Element} the modal component
 */
const AddUserModal = ({ show, setShow }) => {
    const [userDetails, setUserDetails] = useState("");
    const [error, setError] = useState("");

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add a new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <ErrorAlert error={error} setError={setError} />}
                <p>Enter the user's name or email address</p>
                <FormControl
                    value={userDetails}
                    onChange={(event) => setUserDetails(event.target.value)}
                    placeholder={"address@gmail.com"}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!userDetails}
                    className="fw-bolder"
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const RemoveUserModal = ({ user, setUser, show, setShow }) => {
    const [error, setError] = useState("");
    const [confirmationInput, setConfirmationInput] = useState("");

    return (
        <Modal
            show={show}
            onHide={() => {
                setUser(null);
                setShow(false)
            }}
        >
            <Modal.Header>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete user <b>{user.login}</b>.<br />
                    Enter the username of the user to confirm:
                </p>
                <FormControl
                    value={confirmationInput}
                    onChange={(event) => setConfirmationInput(event.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={confirmationInput !== user.login}
                    className="fw-bold bg-danger text-white"
                >
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

/**
 * Tab for supporting CRUD operations on farm's users.
 * @param farm farm object
 * @param users farm's users
 * @return {JSX.Element} the tab component
 */
const UsersTab = ({ farm, users }) => {
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
    const [selectedRemoveUser, setSelectedRemoveUser] = useState(null);

    if (
        typeof farm === "undefined" ||
        typeof users === "undefined"
    )
        return <UsersTabPlaceholder />
    return (
        <>
            <AddUserModal
                show={showAddUserModal}
                setShow={setShowAddUserModal}
            />

            {selectedRemoveUser && (<RemoveUserModal
                user={selectedRemoveUser}
                setUser={setSelectedRemoveUser}
                show={showRemoveUserModal}
                setShow={setShowRemoveUserModal}
            />)}

            <Container className="d-flex flex-column gap-2">
                <div className="text-end">
                    <Button
                        onClick={() => setShowAddUserModal(true)}
                    >
                        +
                    </Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Roles</th>
                        <th>Controls</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <UserDisplay
                            key={index}
                            user={user}
                            setRemoveUser={setSelectedRemoveUser}
                            setShowRemoveUserModal={setShowRemoveUserModal}
                        />
                    ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default UsersTab;