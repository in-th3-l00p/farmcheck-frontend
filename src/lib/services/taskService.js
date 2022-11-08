import axios from "axios";
import {getAuthorizationHeader} from "../auth";

class TaskService {
    /**
     * Creates a task for a farm.
     * @param farmId the farm's id
     * @param userIds list that contains the id's of the users that have this task
     * @param title the title of the task
     * @param description the description of the task
     * @param deadline the deadline of the task
     * @param importance if the task is important
     * @return status message
     */
    async createTask(
        farmId,
        userIds,
        title,
        description,
        deadline,
        importance
    ) {
        try {
            const resp = await axios.post(
                "/api/farms/tasks",
                {
                    userIds,
                    task: { title, description, deadline, importance }
                },
                {
                    headers: getAuthorizationHeader(),
                    params: { farmId }
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    /**
     * Gets every task of a farm.
     * @param farmId farm's id
     * @return list of tasks
     */
    async getFarmTasks(farmId) {
        try {
            const resp = await axios.get(
                "/api/farms/tasks/farm",
                {
                    headers: getAuthorizationHeader(),
                    params: { farmId }
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    /**
     * Gets every task of a user.
     * @return list of tasks
     */
    async getUserTasks() {
        try {
            const resp = await axios.get(
                "/api/farms/tasks",
                { headers: getAuthorizationHeader() }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    /**
     * Gets every status of a task
     * @param taskId task's id
     * @returns statuses
     */
    async getTaskStatus(taskId) {
        try {
            const resp = await axios.get(
                "/api/farms/tasks/status",
                {
                    headers: getAuthorizationHeader(),
                    params: { taskId }
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    async deleteTask(taskId) {
        try {
            const resp = await axios.delete(
                "/api/farms/tasks",
                {
                    headers: getAuthorizationHeader(),
                    params: { taskId }
                }
            )

            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    async finishTask(taskId) {
        try {
            const resp = await axios.put(
                "/api/farms/tasks",
                {},
                {
                    headers: getAuthorizationHeader(),
                    params: { taskId }
                }
            );

            return resp.data;
        } catch (err) {
            throw new Error(err);
        }
    }
}

const taskService = new TaskService();

export default taskService;