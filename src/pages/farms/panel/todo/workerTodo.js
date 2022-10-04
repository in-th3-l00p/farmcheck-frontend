import {useEffect, useState} from "react";
import {Container, Modal} from "react-bootstrap";
import taskService from "../../../../lib/services/taskService";
import _ from "lodash";
import ErrorAlert from "../../../../components/alerts/error";
import {Button} from "../../../../components/buttons/buttons";

import style from "./style.module.scss";

// worker's tab component placeholder
const WorkerTodoTabPlaceholder = () => {
    return (
        <Container className="p-5 text-center">
            <h1>loading...</h1>
        </Container>
    );
}

const TaskDetailsModal = ({ task, show, setShow }) => {
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>View task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Title: <b>"{task.title}"</b></p>
                <p>Description: <b>"{task.description}"</b></p>
                {task.deadline && <p>Deadline: <b>{task.deadline}</b></p>}
                <p>Is important: <b>{task.importance ? "yes" : "no"}</b></p>
            </Modal.Body>
            <Modal.Footer>
                <Button>
                    Finish task
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const TaskDisplay = ({ task }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <TaskDetailsModal
                task={task}
                show={showDetails}
                setShow={setShowDetails}
            />
            <button
                onClick={() => setShowDetails(true)}
                className={style.taskDisplay}
            >
                <h4>{task.title}</h4>
            </button>
        </>
    )
}

/**
 * Worker's tab for managing a farm's tab.
 * @param farm the farm object
 * @param users the users object
 * @return {JSX.Element} the component
 */
const WorkerTodoTab = ({ farm, users }) => {
    const [tasks, setTasks] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        taskService.getUserTasks()
            .then(taskList => setTasks(
                _.filter(
                    taskList,
                    task => task.farmId === farm.id
                )
            ))
            .catch(err => setError(err.message));
    }, [])

    if (tasks === null)
        return <WorkerTodoTabPlaceholder />
    return (
        <Container>
            {error && <ErrorAlert error={error} setError={setError} />}
            <h3>Your tasks:</h3>
            {!tasks.length && (
                <div className="w-100 text-center my-5">
                    <h4>You have no tasks 🤙</h4>
                </div>
            )}
            <ul className="mx-0 px-0 d-flex flex-column gap-3 list-unstyled">
                {tasks.map((task, index) => (
                    <TaskDisplay
                        key={index}
                        task={task}
                    />
                ))}
            </ul>
        </Container>
    );
}

export default WorkerTodoTab;