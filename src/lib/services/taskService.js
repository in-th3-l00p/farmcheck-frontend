import axios from "axios";
import {getAuthorizationHeader} from "../auth";

class TaskService {
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
}

const taskService = new TaskService();

export default taskService;