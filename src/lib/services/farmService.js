import axios from "axios";
import { getAuthorizationHeader } from "../auth";
import _ from "lodash";

// farm main service
class FarmService {
    /**
     * Stores a farm inside the database.
     * @param name name farm
     * @param description farm's description
     */
    async createFarm(name, description) {
        try {
            await axios.post(
                "/api/farms",
                { name, description },
                { headers: getAuthorizationHeader() }
            );
        } catch (err) {
            switch (err.code) {
                case "ERR_BAD_REQUEST":
                    throw new Error(err.response.data.title);
                default:
                    throw new Error("Server error");
            }
        }
    }

    /**
     * Gets a farm's users.
     * @param farmId the id of the farm
     * @returns the list of users
     */
    async getFarmUsers(farmId) {
        const resp = await axios.get("/api/farms/users", {
            headers: getAuthorizationHeader(),
            params: { farmId },
        });

        return resp.data;
    }

    /**
     * Gets a farm's workers.
     * @param farmId farm's id
     * @return the list of workers
     */
    async getFarmWorkers(farmId) {
        const users = await this.getFarmUsers(farmId);
        return _.filter(users, (user) => user.farmRole === 3);
    }

    /**
     * Gets a farm object.
     * @param farmId farm's id
     * @returns
     */
    async getFarm(farmId) {
        const resp = await axios.get("/api/farms/data", {
            headers: getAuthorizationHeader(),
            params: { farmId },
        });

        return resp.data;
    }

    /**
     * Adds a user to a farm.
     * @param {number} farmId farm's id
     * @param {string} username user's username
     * @returns the status message
     */
    async addUser(farmId, username) {
        try {
            const resp = await axios.post(
                "/api/farms/users",
                {},
                {
                    headers: getAuthorizationHeader(),
                    params: { "userLogin": username, farmId }
                }
            )
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    async removeUser(farmId, username) {
        try {
            const resp = await axios.delete(
                "/api/farms/users",
                {
                    headers: getAuthorizationHeader(),
                    params: { "userLogin": username, farmId }
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    async exitFarm(farmId) {
        try {
            const resp = await axios.delete(
                "/api/farms/users/exit",
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

    async updateFarmRole(username, farmId, role) {
        try {
            const resp = await axios.put(
                "/api/farms/roles",
                {
                    farmId: farmId,
                    userLogin: username,
                    role: role
                },
                { headers: getAuthorizationHeader() }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    /**
     * Updates a farm from the database
     * @param farmId farm's id
     * @param newName the new name
     * @param newDescription top g
     * @param newImage the new image
     */
    async updateFarm(farmId, newName, newDescription, newImage) {
        await axios.put(
            "/api/farms/update",
            {
                name: newName,
                description: newDescription,
            },
            {
                headers: getAuthorizationHeader(),
                params: { farmId },
            }
        );
    }

    /**
     * Deletes a farm from the database.
     * @param farmId farm's id
     */
    async deleteFarm(farmId) {
        await axios.delete("/api/farms/delete", {
            headers: getAuthorizationHeader(),
            params: { farmId },
        });
    }

    /**
     * Returns the farms of the authenticated user.
     * @returns farms array
     */
    async getAuthenticatedUserFarms() {
        const resp = await axios.get("/api/farms", {
            headers: getAuthorizationHeader(),
        });
        return resp.data;
    }
}

// the main farm service
const farmService = new FarmService();

export default farmService;
