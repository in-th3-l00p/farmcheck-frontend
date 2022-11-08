import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import messageService from "../../../lib/services/messageService";
import ErrorAlert from "../../../components/alerts/error";
import { Button } from "../../../components/buttons/buttons";

import style from "../styles/panel.module.scss";

const ChatPlaceholder = () => {
    return <p>loading...</p>;
};

/**
 * Chat tab used by the farm panel. It lets the user choose
 * the chat room he wants to enter.
 * @param farm the farm's object
 * @param users the user's object
 */
const ChatTab = ({ farm, users }) => {
    const [rooms, setRooms] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        messageService
            .getChatRooms(farm.id)
            .then((roomList) => setRooms(roomList))
            .catch((err) => setError(err));
    }, []);

    if (farm === undefined || users === undefined || rooms === undefined)
        return <ChatPlaceholder />;
    return (
        <Container className={"w-100"}>
            {error && <ErrorAlert error={error} setError={setError} />}
            <div className="text-end">
                <Button
                    className={style.createButton}
                    onClick={() =>
                        (window.location.href = "/chat/create/" + farm.id)
                    }
                >
                    <span className={style.buttonText}>+</span>
                </Button>
            </div>
            <div
                className={`${style.chatRooms} d-flex flex-column gap-3 p-3`}
                style={{ overflowY: "scroll", maxHeight: "38vh" }}
            >
                {rooms.map((room, index) => (
                    <span
                        key={index}
                        className={style.elementDisplay}
                        onClick={() =>
                            (window.location.href = "/chat/" + room.id)
                        }
                    >
                        <h4 style={{ marginTop: 8 }}>{room.name}</h4>
                    </span>
                ))}
            </div>
        </Container>
    );
};

export default ChatTab;
