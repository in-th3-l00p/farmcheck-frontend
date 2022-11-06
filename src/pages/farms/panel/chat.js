import { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Button } from "../../../components/buttons/buttons";
import SockJsClient from "react-stomp";

import style from "../styles/panel.module.scss";
import _ from "lodash";
import userService from "../../../lib/services/userService";
import messageService from "../../../lib/services/messageService";
import ErrorAlert from "../../../components/alerts/error";
import {getAuthorizationHeader} from "../../../lib/auth";

const CHAT_URL = "http://localhost:8080/ws";

const ChatTabPlaceholder = () => {
    return (
        <Container>
            <p>loading...</p>
        </Container>
    );
};

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
};

const ChatTab = ({ farm, users }) => {
    const stompClient = useRef(null);

    const chatBox = useRef(null);
    const [chatBoxAutoScroll, setChatBoxAutoScroll] = useState(true);

    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        console.log(getAuthorizationHeader());
        messageService
            .getFarmMessages(farm.id)
            .then((messageList) => setMessages(messageList))
            .catch((err) => setError(err));
    }, []);

    // handling auto scrolling
    useEffect(() => {
        if (chatBox.current === null || !chatBoxAutoScroll) return;
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }, [messages]);

    if (
        typeof farm === "undefined" ||
        typeof users === "undefined" ||
        typeof messages === "undefined"
    )
        return <ChatTabPlaceholder />;
    return (
        <>
            <SockJsClient
                url={CHAT_URL}
                headers={getAuthorizationHeader()}
                topics={[`/topic/${farm.id}`]}
                onMessage={(message) => {
                    setMessages(_.cloneDeep(messages).concat(message));
                }}
                ref={stompClient}
            />
            <div
                className="d-flex flex-column gap-2 p-1"
                style={{ padding: 10 }}
            >
                <ErrorAlert error={error} setError={setError} />
                <div
                    className={style.chatBox}
                    ref={chatBox}
                    onScroll={(event) => {
                        setChatBoxAutoScroll(
                            event.target.scrollTop === event.target.scrollTopMax
                        );
                    }}
                >
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
                        if (stompClient.current === null) return;
                        stompClient.current.sendMessage(
                            `/app/chat/sendMessage/${farm.id}`,
                            JSON.stringify({
                                sender: userService.getCurrentUsername(),
                                text: messageInput,
                            })
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
        </>
    );
};

export default ChatTab;
