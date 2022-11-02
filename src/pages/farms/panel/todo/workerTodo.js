import { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import taskService from "../../../../lib/services/taskService";
import _ from "lodash";
import ErrorAlert from "../../../../components/alerts/error";
import { Button } from "../../../../components/buttons/buttons";
import { TaskDisplay } from "./taskDisplay";

import style from "./style.module.scss";

// worker's tab component placeholder
const WorkerTodoTabPlaceholder = () => {
    return (
        <Container className="p-5 text-center">
            <h1>loading...</h1>
        </Container>
    );
};

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
        taskService
            .getUserTasks()
            .then((taskList) =>
                setTasks(_.filter(taskList, (task) => task.farmId === farm.id))
            )
            .catch((err) => setError(err.message));
    }, []);

    if (tasks === null) return <WorkerTodoTabPlaceholder />;
    return (
        <Container>
            {error && <ErrorAlert error={error} setError={setError} />}
            <h3 className="mb-4">Your tasks:</h3>
            {!tasks.length && (
                <div className="w-100 text-center my-5">
                    <h4>You have no tasks 🤙</h4>
                </div>
            )}
            <ul className="mx-0 px-0 d-flex flex-column gap-3 list-unstyled">
                {tasks.map((task, index) => (
                    <TaskDisplay key={index} task={task} />
                ))}
            </ul>
        </Container>
    );
};

export default WorkerTodoTab;
