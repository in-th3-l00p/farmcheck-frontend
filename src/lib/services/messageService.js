import axios from "axios";
import {getAuthorizationHeader} from "../auth";

class MessageService {
    async getFarmMessages(farmId) {
        const resp = await axios.get(
            "/api/messages",
            {
                headers: getAuthorizationHeader(),
                params: { farmId }
            }
        )

        return resp.data;
    }
}

// main message service
const messageService = new MessageService();

export default messageService;