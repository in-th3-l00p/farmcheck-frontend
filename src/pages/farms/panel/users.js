import { useState } from "react";
import {
    Alert,
    Col,
    Container,
    FormControl,
    FormSelect,
    Modal,
    Row,
    Table,
} from "react-bootstrap";
import { Button } from "../../../components/buttons/buttons";
import ErrorAlert from "../../../components/alerts/error";
import userService from "../../../lib/services/userService";

import style from "./../styles/panel.module.scss";

/**
 * Used while waiting for the farm data to be fetched.
 * @return {JSX.Element} placeholder component
 */
const UsersTabPlaceholder = () => {
    return <Container></Container>;
};

// roles of a user
const roles = ["Owner", "Admin", "+Worker"];
const selectableRoles = [
    { name: "Admin", id: 2 },
    { name: "Worker", id: 3 },
];

/**
 * Component used for displaying a user inside the users table.
 * @param user user object
 * @param setShowRemoveUserModal state's reducer for showing the confirmation modal for removing a user
 * @param setRemoveUser reducer for the user's object that is trying to be removed
 * @param setShowRemoveUserModal state's reducer for showing the modal that changes the role of a user
 * @param setChangeRoleUser reducer for the user's object whose role is changed
 * @return {JSX.Element} the component
 */
const UserDisplay = ({
    user,
    setShowRemoveUserModal,
    setRemoveUser,
    setShowChangeRoleModal,
    setChangeRoleUser,
}) => {
    const role = roles[user.farmRole - 1];

    if (role === "Owner") return <></>;
    return (
        <tr>
            <td>{user.login}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{role}</td>

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
                            <Button
                                onClick={() => {
                                    setChangeRoleUser(user);
                                    setShowChangeRoleModal(true);
                                }}
                            >
                                change role
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </td>
        </tr>
    );
};

// used for rendering the logged user
const UserDisplayWithoutControls = ({ user }) => {
    // indexing the user's role
    const roles = ["Owner", "Admin", "Worker"];
    const role = roles[user.farmRole - 1];

    return (
        <tr>
            <td>{user.login}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{role}</td>
            <td></td>
        </tr>
    );
};

/**
 * Modal user for adding a new user to the current farm.
 * @param show if the modal should appear
 * @param setShow show state's reducer
 * @param setError error state's reducer
 * @return {JSX.Element} the modal component
 */
const AddUserModal = ({
    farmId,
    setSuccessMessage,
    setErrorMessage,
    show,
    setShow,
}) => {
    const [userDetails, setUserDetails] = useState("");
    const [error, setError] = useState("");

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <ErrorAlert error={error} setError={setError} />}
                <p>Enter the user's name or email address</p>
                <FormControl
                    value={userDetails}
                    onChange={(event) => setUserDetails(event.target.value)}
                    placeholder={"username / address@gmail.com"}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!userDetails}
                    onClick={() => {
                        userService
                            .addFarm(userDetails, farmId)
                            .then((message) => setSuccessMessage(message))
                            .catch((error) => setErrorMessage(error.message))
                            .finally(() => setShow(false));
                    }}
                    className="fw-bolder"
                    style={{ width: "100px" }}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const RemoveUserModal = ({
    farmId,
    setSuccessMessage,
    setErrorMessage,
    user,
    setUser,
    show,
    setShow,
}) => {
    const [confirmationInput, setConfirmationInput] = useState("");

    return (
        <Modal
            show={show}
            onHide={() => {
                setUser(null);
                setConfirmationInput("");
                setShow(false);
            }}
        >
            <Modal.Header>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete user <b>{user.login}</b>.
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
                    disabled={confirmationInput !== user.login}
                    onClick={() => {
                        userService
                            .removeFarm(user.login, farmId)
                            .then((message) => setSuccessMessage(message))
                            .catch((err) => setErrorMessage(err.message))
                            .finally(() => {
                                setShow(false);
                                setConfirmationInput("");
                            });
                    }}
                    className="fw-bold bg-danger text-white"
                >
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const ChangeRoleModal = ({
    farmId,
    setSuccessMessage,
    setErrorMessage,
    user,
    setUser,
    show,
    setShow,
}) => {
    const userRole = roles[user.farmRole - 1];
    const [selectedRole, setSelectedRole] = useState(selectableRoles[0].id);

    const hide = () => {
        setUser(null);
        setShow(false);
    };

    if (user.farmRole === 1) return <></>;
    return (
        <Modal
            show={show}
            onHide={() => {
                setUser(null);
                setShow(false);
            }}
        >
            <Modal.Header>
                <Modal.Title>Change the role of user {user.login}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Select the role of the user:</p>
                <FormSelect
                    value={selectedRole.id}
                    onChange={(event) => setSelectedRole(event.target.value)}
                >
                    <option value={selectableRoles[0].id}>
                        {selectableRoles[0].name}
                    </option>
                    <option value={selectableRoles[1].id}>
                        {selectableRoles[1].name}
                    </option>
                </FormSelect>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        const selectedRoleObject = selectableRoles.find(
                            (role) => role.id === selectedRole
                        );
                        if (selectedRoleObject.name === userRole) {
                            setErrorMessage(
                                `User ${user.login} already has the ${selectedRoleObject.name} role.`
                            );
                            hide();
                            return;
                        }
                        userService
                            .updateFarmRole(user.login, farmId, selectedRole)
                            .then((message) => setSuccessMessage(message))
                            .catch((err) => setErrorMessage(err.message))
                            .finally(hide);
                    }}
                    className="fw-bold bg-danger text-white"
                >
                    Change
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

/**
 * Tab for supporting CRUD operations on farm's users.
 * TODO: automatically reload changes.
 * @param farm farm object
 * @param users farm's users
 * @return {JSX.Element} the tab component
 */
const UsersTab = ({ farm, users }) => {
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
    const [selectedRemoveUser, setSelectedRemoveUser] = useState(null);
    const [showChangeRoleModal, setShowChangeRoleModel] = useState(false);
    const [selectedChangeRoleUser, setSelectedChangeRoleUser] = useState(null);

    // messages showed for adding users to the farm
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    if (typeof farm === "undefined" || typeof users === "undefined")
        return <UsersTabPlaceholder />;
    return (
        <>
            <AddUserModal
                farmId={farm.id}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
                show={showAddUserModal}
                setShow={setShowAddUserModal}
            />

            {selectedRemoveUser && (
                <RemoveUserModal
                    farmId={farm.id}
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                    user={selectedRemoveUser}
                    setUser={setSelectedRemoveUser}
                    show={showRemoveUserModal}
                    setShow={setShowRemoveUserModal}
                />
            )}

            {selectedChangeRoleUser && (
                <ChangeRoleModal
                    farmId={farm.id}
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                    user={selectedChangeRoleUser}
                    setUser={setSelectedChangeRoleUser}
                    show={showChangeRoleModal}
                    setShow={setShowChangeRoleModel}
                />
            )}

            <Container className="d-flex flex-column gap-2">
                {errorMessage && (
                    <ErrorAlert
                        error={errorMessage}
                        setError={setErrorMessage}
                    />
                )}
                {successMessage && (
                    <Alert
                        variant="success"
                        onClose={() => setSuccessMessage("")}
                        dismissible
                    >
                        {successMessage}
                    </Alert>
                )}
                <div className="text-end">
                    <Button
                        onClick={() => setShowAddUserModal(true)}
                        className={style.createButton}
                    >
                        <span className={style.buttonText}>+</span>
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
                        {users.map((user, index) => {
                            if (
                                user.login ===
                                    userService.getCurrentUsername() ||
                                user.farmRole === 1
                            )
                                return (
                                    <UserDisplayWithoutControls
                                        key={index}
                                        user={user}
                                    />
                                );
                            return (
                                <UserDisplay
                                    key={index}
                                    user={user}
                                    setRemoveUser={setSelectedRemoveUser}
                                    setShowRemoveUserModal={
                                        setShowRemoveUserModal
                                    }
                                    setChangeRoleUser={
                                        setSelectedChangeRoleUser
                                    }
                                    setShowChangeRoleModal={
                                        setShowChangeRoleModel
                                    }
                                />
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default UsersTab;
