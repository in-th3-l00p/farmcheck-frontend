import { useEffect, useState } from "react";
import {
    Alert,
    Container,
    FormControl,
    FormSelect,
    Modal,
} from "react-bootstrap";
import { Button } from "../../../components/buttons/buttons";
import ErrorAlert from "../../../components/alerts/error";
import userService from "../../../lib/services/userService";

import style from "./../styles/panel.module.scss";
import UserItem from "./user-item/useritem";
import farmService from "../../../lib/services/farmService";

/**
 * Used while waiting for the farm data to be fetched.
 * @return {JSX.Element} placeholder component
 */
const UsersTabPlaceholder = () => {
    return <Container></Container>;
};

// roles of a user
const roles = ["Owner", "Admin", "Worker"];
const selectableRoles = [
    { name: "Admin", id: 2 },
    { name: "Worker", id: 3 },
];

const AddUserModal = ({
    farmId,
    setSuccessMessage,
    setErrorMessage,
    show,
    setShow,
    setUsers,
}) => {
    const [userDetails, setUserDetails] = useState("");
    const [error, setError] = useState("");

    return (
        <Modal show={show} onHide={() => setShow(false)} style={{ top: "25%" }}>
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
                        farmService
                            .addUser(farmId, userDetails)
                            .then((message) => {
                                setSuccessMessage(message);
                                setUsers([]);
                            })
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
    setUsers,
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
            style={{ top: "25%" }}
        >
            <Modal.Header>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to remove user <b>{user.login}</b>.
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
                                setUsers([]);
                            });
                    }}
                    className={`${style.button} fw-bold bg-danger text-white`}
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
    setUsers,
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
            style={{ top: "25%" }}
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
                            (role) => role.id == selectedRole
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
                            .then((message) => {
                                setSuccessMessage(message);
                                setUsers([]);
                            })
                            .catch((err) => setErrorMessage(err.message))
                            .finally(hide);
                    }}
                    className={style.button}
                >
                    Change role
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

/**
 * Tab for supporting CRUD operations on farm's users.
 * @param farm farm object
 * @param users farm's users
 * @param setUsers farm's users state reducer
 * @return {JSX.Element} the tab component
 */
const UsersTab = ({ farm, users, setUsers }) => {
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
    const [selectedRemoveUser, setSelectedRemoveUser] = useState(null);
    const [showChangeRoleModal, setShowChangeRoleModel] = useState(false);
    const [selectedChangeRoleUser, setSelectedChangeRoleUser] = useState(null);

    // messages showed for adding users to the farm
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // auto reload
    useEffect(() => {
        if (users.length) return;
        farmService
            .getFarmUsers(farm.id)
            .then((resp) => setUsers(resp))
            .catch((err) => setErrorMessage(err.message));
    }, [users]);

    if (
        typeof farm === "undefined" ||
        typeof users === "undefined" ||
        !users.length
    )
        return <UsersTabPlaceholder />;
    return (
        <>
            <AddUserModal
                farmId={farm.id}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
                show={showAddUserModal}
                setShow={setShowAddUserModal}
                setUsers={setUsers}
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
                    setUsers={setUsers}
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
                    setUsers={setUsers}
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
                <div className={`overflow-auto p-3 ${style.user}`}>
                    {users.map((user, index) => {
                        if (
                            user.login === userService.getCurrentUsername() ||
                            user.farmRole === 1
                        )
                            return (
                                <UserItem
                                    key={index}
                                    user={user}
                                    controls={false}
                                />
                            );
                        return (
                            <UserItem
                                key={index}
                                user={user}
                                controls={true}
                                setRemoveUser={setSelectedRemoveUser}
                                setShowRemoveUserModal={setShowRemoveUserModal}
                                setChangeRoleUser={setSelectedChangeRoleUser}
                                setShowChangeRoleModal={setShowChangeRoleModel}
                            />
                        );
                    })}
                </div>
                {/* <Table striped bordered hover>
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
                </Table> */}
            </Container>
        </>
    );
};

export default UsersTab;
