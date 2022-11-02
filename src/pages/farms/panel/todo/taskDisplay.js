import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../../../../components/buttons/buttons";

import style from "./style.module.scss";

const TaskDetailsModal = ({ task, show, setShow }) => {
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>View task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Title: <b>"{task.title}"</b>
                </p>
                <p>
                    Description: <b>"{task.description}"</b>
                </p>
                {task.deadline && (
                    <p>
                        Deadline: <b>{task.deadline}</b>
                    </p>
                )}
                <p>
                    Is important: <b>{task.importance ? "yes" : "no"}</b>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className={style.button}>Finish task</Button>
            </Modal.Footer>
        </Modal>
    );
};

export const TaskDisplay = ({ className, task }) => {
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
