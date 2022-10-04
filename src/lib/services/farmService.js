import axios from "axios";
import {getAuthorizationHeader} from "../auth";
import _ from "lodash";

// farm main service
class FarmService {
    /**
     * Stores a farm inside the database.
     * @param name name farm
     * @param image the image file encoded in bytes
     */
    async createFarm(name, image) {
        try {
            await axios.post(
                "/api/farms",
                {name, image},
                {headers: getAuthorizationHeader()}
            );
        }catch(err) {
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
        const resp = await axios.get(
            "/api/farms/users",
            {
                headers: getAuthorizationHeader(),
                params: { farmId }
            }
        );

        return resp.data;
    }

    /**
     * Gets a farm's workers.
     * @param farmId farm's id
     * @return the list of workers
     */
    async getFarmWorkers(farmId) {
        const users = await this.getFarmUsers(farmId);
        return _
            .filter(users, (user) => user.farmRole === 3);
    }

    /**
     * Gets a farm object.
     * @param farmId farm's id
     * @returns 
     */
    async getFarm(farmId) {
        const resp = await axios.get(
            "/api/farms/data",
            {
                headers: getAuthorizationHeader(),
                params: { farmId }
            }
        );

        return resp.data;
    }

    /**
     * Updates a farm from the database
     * @param farmId farm's id
     * @param newName the new name
     * @param newImage the new image
     */
    async updateFarm(farmId, newName, newImage) {
        await axios.put(
            "/api/farms/update",
            {
                name: newName,
            },
            {
                headers: getAuthorizationHeader(),
                params: { farmId }
            }
        );
    }

    /**
     * Deletes a farm from the database.
     * @param farmId farm's id
     */
    async deleteFarm(farmId) {
        await axios.delete(
            "/api/farms/delete",
            {
                headers: getAuthorizationHeader(),
                params: { farmId }
            }
        );
    }

    /**
     * Returns the farms of the authenticated user.
     * @returns farms array
     */
    async getAuthenticatedUserFarms() {
        const resp = await axios.get(
            "/api/farms",
            { headers: getAuthorizationHeader() }
        );
        return resp.data;
    }
}

// the main farm service
const farmService = new FarmService();

export default farmService;