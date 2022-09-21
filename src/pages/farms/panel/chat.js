import { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap"
import { Button } from "../../../components/buttons/buttons";

const ChatTabPlaceholder = () => {
    return (
        <Container>
            <p>loading... prea chill</p>
        </Container>
    )
}

const ChatTab = ({ farm, users }) => {
    const [message, setMessage] = useState("");

    if (
        typeof farm === "undefined" || 
        typeof users === "undefined"
    )
        return <ChatTabPlaceholder />
    return (
        <Container className="d-flex gap-2">
            <ul>

            </ul> 
            <Form className="d-flex w-100">
                <Form.Control 
                    value={message} 
                    onChange={(event) => setMessage(event.target.value)}
                    className="me-2 w-100"
                />
                <Button>Send</Button>
            </Form>
        </Container>
    ) 
}

export default ChatTab;