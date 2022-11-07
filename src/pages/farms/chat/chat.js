import {useParams} from "react-router-dom";
import TextBox from "../../../components/textbox/textbox";
import userService from "../../../lib/services/userService";
import {useEffect, useRef, useState} from "react";
import ErrorAlert from "../../../components/alerts/error";
import {Form} from "react-bootstrap";
import {Button} from "../../../components/buttons/buttons";
import SockJsClient from "react-stomp";
import _ from "lodash";
import {getAuthorizationHeader} from "../../../lib/auth";

import style from "./styles/chat.module.scss";
import messageService from "../../../lib/services/messageService";

const CHAT_URL = "http://localhost:8080/ws";

const ChatMessage = ({ message }) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleWindowResize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const date = message.datetime
        .replace(/T/g, " ")
        .replace(/\..*/g, "")
        .replace("-", ".")
        .replace("-", ".")
        .slice(width <= 550 ? 10 : 0, -3);

    return (
        <div
            className={`${style.messageBox} ${
                userService.getCurrentUsername() === message.sender
                    ? style.rightMessages
                    : {}
            }`}
        >
            <div className={style.messageHeader}>
                <p className={style.sender}>{message.sender}</p>
                <p className={`${style.date} text-muted`}>{date}</p>
            </div>
            <p className={style.message}>{message.text}</p>
        </div>
    );
}

const Chat = () => {
    const params = useParams();
    const stompClient = useRef(null);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        messageService.getChatMessages(params["chat_id"])
            .then(resp => setMessages(resp))
            .catch(err => setError(err));
    }, [])

    if (!params["chat_id"] || error)
        return (
            <TextBox
                className={"mt-100 d-flex justify-content-center align-items-center"}
                style={{ height: "80vh" }}
            >
                <h1>Chat with the given id not found.</h1>
            </TextBox>
        );

    return (
        <TextBox
            title={`Chat #${params["chat_id"]}`}
            className={"mt-100"}
            style={{ height: "80vh" }}
        >
            <SockJsClient
                url={CHAT_URL}
                headers={getAuthorizationHeader()}
                topics={[`/topic/${params["chat_id"]}`]}
                onMessage={(message) => {
                    setMessages(_.cloneDeep(messages).concat(message));
                }}
                ref={stompClient}
            />
             <div className="d-flex flex-column gap-2 p-1 h-100 pb-4">
                <ErrorAlert error={error} setError={setError} />
                    <div className={style.chatBox}>
                        <ul>
                            {messages.map((message, index) => (
                                 <li key={index}>
                                     <ChatMessage message={message} />
                                 </li>
                            ))}
                        </ul>
                    </div>
                <Form
                    className="d-flex w-100"
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (stompClient.current === null)
                            return;
                        stompClient.current.sendMessage(
                             `/app/chat/sendMessage/${params["chat_id"]}`,
                             JSON.stringify({
                                 sender: userService.getCurrentUsername(),
                                 text: messageInput,
                             }),
                            getAuthorizationHeader()
                        );
                        setMessageInput("");
                    }}
                >
                <Form.Control
                    value={messageInput}
                    onChange={(event) =>
                        setMessageInput(event.target.value)
                    }
                    className="me-2 w-100"
                />
                    <Button
                        type="submit"
                        disabled={!messageInput}
                        style={{ width: "100px", fontWeight: "500" }}
                    >
                        Send
                    </Button>
                </Form>
            </div>
        </TextBox>
    );
}

export default Chat;