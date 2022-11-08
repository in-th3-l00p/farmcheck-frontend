import axios from "axios";
import {getAuthorizationHeader} from "../auth";

class MessageService {
    async getChatRooms(farmId) {
        try {
            const resp = await axios.get(
                "/api/chats",
                {
                    headers: getAuthorizationHeader(),
                    params: {farmId}
                }
            );

            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    async createChatRoom(farmId, name) {
        try {
            const resp = await axios.post(
                "/api/chats/",
                { name },
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

    async getChatMessages(chatId) {
        try {
            const resp = await axios.get(
                "/api/chats/messages",
                {
                    headers: getAuthorizationHeader(),
                    params: { chatId }
                }
            );

            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    async getChatName(chatId) {
        try {
            const resp = await axios.get(
                "/api/chats/name",
                {
                    headers: getAuthorizationHeader(),
                    params: { chatId }
                }
            );

            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }
}

// main message service
const messageService = new MessageService();

export default messageService;