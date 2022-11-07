import { useEffect, useRef, useState } from "react";
import { Alert, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Button } from "../../../../components/buttons/buttons";
import farmService from "../../../../lib/services/farmService";
import ErrorAlert from "../../../../components/alerts/error";
import { LabelInput } from "../../../../components/forms/forms";
import _ from "lodash";
import DateTimePicker from "react-datetime-picker";
import taskService from "../../../../lib/services/taskService";
import { TaskDisplay } from "./taskDisplay";

import style from "./style.module.scss";
import { AdminTaskDisplay } from "./adminTaskDisplay";

// only placeholders
const AdminTodoTabPlaceholder = () => {
    return (
        <Container>
            <p>loading...</p>
        </Container>
    );
};

const CreateMenuPlaceholder = ({ setMenu }) => {
    return (
        <Layout setMenu={setMenu}>
            <p>loading...</p>
        </Layout>
    );
};

// menus
const Menu = {
    Main: 0,
    Create: 1,
};

// used for creating selectable workers
const createSelectableList = (list) => {
    return _.map(list, (element) => _.assign(element, { selected: false }));
};

/**
 * Layout component used by every menu.
 * @param setMenu the menu state reducer
 * @param backButton if the back button should be present
 * @param children children components
 * @return {JSX.Element} the layout component
 */
const Layout = ({ setMenu, backButton = true, children }) => {
    return (
        <Container>
            {backButton && (
                <div className="text-end">
                    <Button
                        onClick={() => setMenu(Menu.Main)}
                        className={`${style.createButton} mb-3 bg-danger text-white`}
                    >
                        <span className={style.buttonText}>x</span>
                    </Button>
                </div>
            )}
            {children}
        </Container>
    );
};

/**
 * Modal used for creating a task for a number of workers.
 * @param farm the farm object
 * @param user the worker
 * @param setShow the show state reducer
 * @param setError sets an error if happend
 * @param setSuccess set successs message
 * @return {JSX.Element} the modal component
 */
const CreateTaskModal = ({ farm, workers, setShow, setError, setSuccess }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [useDeadline, setUseDeadline] = useState(false);
    const [deadline, setDeadline] = useState(new Date());
    const [importance, setImportance] = useState(false);
    const close = () => {
        setShow(false);
    };

    if (workers === []) return <></>;
    return (
        <Modal show={true} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Create a task for {workers.length} workers
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LabelInput
                    label="Title"
                    className="mb-3"
                    value={title}
                    setValue={(value) => {
                        if (value.length > 100) return;
                        setTitle(value);
                    }}
                />
                <Form.Group className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        style={{ height: "200px" }}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Group>
                <span>
                    <Form.Group className="mb-2 d-flex">
                        <Form.Label className="me-2">Deadline:</Form.Label>
                        <Form.Check
                            onChange={() => setUseDeadline(!useDeadline)}
                        />
                    </Form.Group>
                    {useDeadline && (
                        <Form.Group className="mb-2">
                            <Form.Label className="me-2">Deadline:</Form.Label>
                            <DateTimePicker
                                onChange={setDeadline}
                                value={deadline}
                            />
                        </Form.Group>
                    )}
                </span>
                <Form.Group className="d-flex align-items-center gap-2">
                    <Form.Label className="mt-1">Important</Form.Label>
                    <Form.Check onChange={() => setImportance(!importance)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!title}
                    className={style.button}
                    onClick={() => {
                        taskService
                            .createTask(
                                farm.id,
                                _.map(workers, (user) => user.id),
                                title,
                                description,
                                useDeadline ? deadline : null,
                                importance
                            )
                            .then(() => {
                                setSuccess("Task created.");
                                close();
                            })
                            .catch((err) => {
                                setError(err.message);
                                close();
                            });
                    }}
                >
                    Create
                </Button>
                <Button
                    className={`${style.button} bg-danger text-white`}
                    onClick={close}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

/**
 * Used for displaying a worker in a worker list
 * @param worker the worker object
 * @param selectable if the worker can be selected
 * @param small the way it should display
 * @param onSelect select callback
 * @param onClick click callback
 * @return {JSX.Element} the component
 */
const WorkerDisplay = ({
    worker,
    selectable = false,
    small = false,
    onSelect = () => {},
    onClick = () => {},
}) => {
    const [selected, setSelect] = useState(false);

    if (selectable === false) {
        return (
            <button
                className={
                    small ? style.smallWorkerDisplay : style.workerDisplay
                }
                onClick={onClick}
            >
                <p>{worker.login}</p>
            </button>
        );
    }
    return (
        <button
            className={
                small
                    ? selected
                        ? style.selectedSmallWorkerDisplay
                        : style.unselectedSmallWorkerDisplay
                    : selected
                    ? style.selectedWorkerDisplay
                    : style.unselectedWorkerDisplay
            }
            onClick={() => {
                onSelect();
                setSelect(!selected);
            }}
        >
            <p>{worker.login}</p>
        </button>
    );
};

/**
 * Menu used for creating a task for a number of  workers.
 * @param setMenu the menu state reducer
 * @param farm the farm object
 * @param users the users list
 * @return {JSX.Element} the menu component
 */
const CreateMenu = ({ setMenu, farm, users }) => {
    const [workers, setWorkers] = useState(undefined);
    let selectedWorkersCount = useRef(0);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // used for the create task modal
    const [showCreateModal, setShowCreateModal] = useState(false);

    // fetching data
    useEffect(() => {
        farmService
            .getFarmWorkers(farm.id)
            .then((workerList) => setWorkers(createSelectableList(workerList)))
            .catch((err) => setError(err.message));
    }, []);

    if (error)
        return (
            <Container fluid className="text-center py-5">
                <h4>{error}</h4>
            </Container>
        );
    if (workers === undefined)
        return <CreateMenuPlaceholder setMenu={setMenu} />;
    return (
        <>
            {showCreateModal && (
                <CreateTaskModal
                    farm={farm}
                    workers={_.filter(workers, (worker) => worker.selected)}
                    setShow={setShowCreateModal}
                    setError={setError}
                    setSuccess={setSuccess}
                />
            )}
            <Layout setMenu={setMenu}>
                {error && <ErrorAlert error={error} setError={setError} />}
                {success && (
                    <Alert
                        variant="success"
                        onClose={() => setSuccess("")}
                        dismissible
                    >
                        {success}
                    </Alert>
                )}
                {workers.length === 0 ? (
                    <div className={style.center} style={{ marginTop: "-4vh" }}>
                        <h4>There are no users</h4>
                    </div>
                ) : (
                    <>
                        <h4 className="mb-4 mx-3">Select the workers:</h4>
                        <Container fluid>
                            {workers.map((worker, index) => (
                                <WorkerDisplay
                                    key={index}
                                    worker={worker}
                                    selectable={true}
                                    onSelect={() => {
                                        const workerList = _.cloneDeep(workers);
                                        selectedWorkersCount.current +=
                                            !workerList[index].selected
                                                ? 1
                                                : -1;
                                        workerList[index].selected =
                                            !workerList[index].selected;
                                        setWorkers(workerList);
                                    }}
                                />
                            ))}
                        </Container>
                        <div className="w-100 d-flex justify-content-center">
                            <Button
                                disabled={!selectedWorkersCount.current}
                                onClick={() => setShowCreateModal(true)}
                                className={style.button}
                            >
                                Create task
                            </Button>
                        </div>
                    </>
                )}
            </Layout>
        </>
    );
};

/**
 * Menu used for managing tasks.
 * @param setMenu the menu state reducer
 * @param farm the farm object
 * @param users the users list
 * @return {JSX.Element} the menu component
 * @constructor
 */
const ManageMenu = ({ farm, users }) => {
    const tasks = useRef(null);
    const selectedWorkers = useRef(0);

    const [workers, setWorkers] = useState(null);
    const [showedTasks, setShowedTasks] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        taskService
            .getFarmTasks(farm.id)
            .then((taskList) => {
                tasks.current = taskList;
                setShowedTasks(tasks.current);
            })
            .catch((err) => setError(err.message));
        farmService
            .getFarmWorkers(farm.id)
            .then((workerList) => setWorkers(createSelectableList(workerList)))
            .catch((err) => setError(err.message));
    }, []);

    // updating the showed tasks
    useEffect(() => {
        if (!tasks.current) return;
        if (!selectedWorkers.current) {
            setShowedTasks(tasks.current);
            return;
        }

        // O(n^2) ca n-avem buget de programare dinamica
        const selectedWorkerIds = _(workers)
            .filter((w) => w.selected)
            .map((w) => w.id)
            .value();
        setShowedTasks(
            _.filter(
                tasks.current,
                (task) =>
                    _.intersection(task.userIds, selectedWorkerIds).length > 0
            )
        );
    }, [workers]);

    if (workers === null || showedTasks === null) return <></>;
    return (
        <div>
            {error && <ErrorAlert error={error} setError={setError} />}
            <Row sm>
                <Col xs={3}>
                    {workers.length !== 0 ? (
                        <>
                            <h5>Filter by workers:</h5>
                            {workers.map((worker, index) => (
                                <WorkerDisplay
                                    key={index}
                                    worker={worker}
                                    small={true}
                                    selectable={true}
                                    onSelect={() => {
                                        const workerList = _.cloneDeep(workers);
                                        workerList[index].selected =
                                            !workerList[index].selected;
                                        selectedWorkers.current += workerList[
                                            index
                                        ].selected
                                            ? 1
                                            : -1;
                                        setWorkers(workerList);
                                    }}
                                />
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                </Col>
                <Col>
                    {showedTasks.length === 0 ? (
                        <div
                            className={style.center}
                            style={{ marginLeft: "-10vw" }}
                        >
                            <h4>There are no tasks 🤙</h4>
                        </div>
                    ) : (
                        <></>
                    )}
                    {showedTasks !== null &&
                        showedTasks.map((task, index) => (
                            <AdminTaskDisplay
                                className={style.filteredTask}
                                key={index}
                                task={task}
                            />
                        ))}
                </Col>
            </Row>
        </div>
    );
};

/**
 * Button component used for the main menu.
 * @param onClick callback used for handling clicks
 * @param children child components
 * @return {JSX.Element} the button components
 */
const MainMenuButton = ({ onClick, children }) => {
    return (
        <div className="w-100 h-100 center">
            <button onClick={onClick} className={style.mainMenuButton}>
                {children}
            </button>
        </div>
    );
};

/**
 * Admin tab for managing the todo list.
 * @param farm the farm object
 * @param users the user list
 * @return {JSX.Element} the tab component
 */
const AdminTodoTab = ({ farm, users }) => {
    const [menu, setMenu] = useState(Menu.Main);

    if (typeof farm === "undefined" && typeof users === "undefined")
        return <AdminTodoTabPlaceholder />;
    if (menu === Menu.Create)
        return <CreateMenu setMenu={setMenu} farm={farm} users={users} />;
    // if (menu === Menu.Manage)
    //     return <ManageMenu setMenu={setMenu} farm={farm} users={users} />;
    return (
        <Layout backButton={false}>
            {/* creating the dialog where the user selects the menu */}
            <div className="text-end">
                <Button
                    onClick={() => setMenu(Menu.Create)}
                    className={style.createButton}
                >
                    <span className={style.buttonText}>+</span>
                </Button>
            </div>
            <ManageMenu farm={farm} users={users} />
            {/* <Col>
                <MainMenuButton onClick={() => setMenu(Menu.Manage)}>
                    <p className={style.text}>Manage</p>
                </MainMenuButton>
            </Col> */}
        </Layout>
    );
};

export default AdminTodoTab;
