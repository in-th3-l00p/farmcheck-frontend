import {useEffect, useRef, useState} from "react";
import {Col, Container, Form, Row} from "react-bootstrap"
import {Button} from "../../../components/buttons/buttons";
import SockJsClient from "react-stomp";

import style from "../styles/panel.module.scss";
import _ from "lodash";
import userService from "../../../lib/services/userService";
import messageService from "../../../lib/services/messageService";
import ErrorAlert from "../../../components/alerts/error";

const CHAT_URL = "http://localhost:8080/ws";

const ChatTabPlaceholder = () => {
    return (
        <Container>
            <p>loading... prea chill</p>
        </Container>
    )
}

const ChatMessage = ({ message }) => {
    const date = message.datetime
        .replace(/T/g, " ")
        .replace(/\..*/g, "");

    return (
        <Container fluid className="p-1 border">
            <Row>
                <Col sm><p className="fw-bold me-2">{message.sender}</p></Col>
                <Col sm={6}><p>{message.text}</p></Col>
                <Col sm><p className="text-muted fw-lighter">{date}</p></Col>
            </Row>
        </Container>
    );
}

const ChatTab = ({ farm, users }) => {
    const stompClient = useRef(null);

    const chatBox = useRef(null);
    const [chatBoxAutoScroll, setChatBoxAutoScroll] = useState(true);

    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        messageService.getFarmMessages(farm.id)
            .then(messageList => setMessages(messageList))
            .catch(err => setError(err));
    }, []);

    // handling auto scrolling
    useEffect(() => {
        if (chatBox.current === null || !chatBoxAutoScroll)
            return;
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }, [messages])

    if (
        typeof farm === "undefined" ||
        typeof users === "undefined" ||
        typeof messages === "undefined"
    )
        return <ChatTabPlaceholder />
    return (
        <>
            <SockJsClient
                 url={CHAT_URL}
                 topics={[`/topic/${farm.id}`]}
                 onMessage={(message) => {
                     setMessages(_
                         .cloneDeep(messages)
                         .concat(message)
                     );
                 }}
                 ref={stompClient}
            />
            <Container className="d-flex flex-column gap-2">
                <ErrorAlert error={error} setError={setError} />
                <div
                    className={style.chatBox}
                    ref={chatBox}
                    onScroll={(event) => {
                        setChatBoxAutoScroll(
                            event.target.scrollTop ===
                            event.target.scrollTopMax
                        );
                    }}
                >
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}><ChatMessage message={message}/></li>
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
                            `/app/chat/sendMessage/${farm.id}`,
                            JSON.stringify({
                                sender: userService.getCurrentUsername(),
                                text: messageInput
                            })
                        );
                        setMessageInput("");
                    }}
                >
                    <Form.Control
                        value={messageInput}
                        onChange={(event) => setMessageInput(event.target.value)}
                        className="me-2 w-100"
                    />
                    <Button
                        type="submit"
                        disabled={!messageInput}
                    >
                        Send
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default ChatTab;