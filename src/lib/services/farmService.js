import axios from "axios";
import {getAuthorizationHeader} from "../auth";

// farm main service
class FarmService {
    /**
     * Stores a farm inside the database.
     * @param {string} name name farm
     * @param {*[]} image the image file encoded in bytes
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