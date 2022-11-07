import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../../../../components/buttons/buttons";

import style from "./style.module.scss";
import taskService from "../../../../lib/services/taskService";
import ErrorAlert from "../../../../components/alerts/error";

const TaskDetailsModal = ({ task, show, setShow }) => {
    const [status, setStatus] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        taskService
            .getTaskStatus(task.id)
            .then((taskStatus) => setStatus(taskStatus))
            .catch((err) => setError(error));
    }, []);

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>View task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>
                    Title: <b>{task.title}</b>
                </h5>
                <p className="mt-3">
                    Description:{" "}
                    <b>{task.description === "" ? "none" : task.description}</b>
                </p>
                {task.deadline && (
                    <p>
                        Deadline: <b>{task.deadline}</b>
                    </p>
                )}
                <p>
                    Importance: <b>{task.importance ? "high" : "low"}</b>
                </p>
                <div>
                    <h5>Status:</h5>
                    {error && <h2>Error getting users' status</h2>}
                    <span className="d-flex flex-column gap-3">
                        {status && !error ? (
                            status.map((userStatus, index) => (
                                <span
                                    className={`${style.viewTask} d-flex w-100 border p-2`}
                                >
                                    <p className="me-auto mt-2">
                                        {userStatus.user}
                                    </p>
                                    <p
                                        className="mt-2"
                                        style={
                                            userStatus.status
                                                ? { color: "green" }
                                                : { color: "red" }
                                        }
                                    >
                                        {userStatus.status
                                            ? "finished"
                                            : "not finished"}
                                    </p>
                                </span>
                            ))
                        ) : (
                            <p>loading...</p>
                        )}
                    </span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className={`${style.button} bg-danger text-white fw-bold`}
                >
                    Delete task
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export const AdminTaskDisplay = ({ className, task }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className={className}>
            <TaskDetailsModal
                task={task}
                show={showDetails}
                setShow={setShowDetails}
            />
            <button
                onClick={() => setShowDetails(true)}
                disabled={task.status}
                className={
                    task.status ? style.finishedTaskDisplay : style.taskDisplay
                }
            >
                <h4>{task.title}</h4>
            </button>
        </div>
    );
};
