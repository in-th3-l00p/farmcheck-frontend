import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import style from "./feedback.module.scss";

const FeedBackPlaceholder = () => {
    <div className={`p-5 text-center ${style.feedBack}`}>
        <h1>loading...</h1>
    </div>;
};

const FeedBackShow = () => {
    const [feedbacks, setFeedbacks] = useState(null);

    useEffect(() => {
        axios
            .get("/api/feedback")
            .then((feedbacks) => {
                setFeedbacks(feedbacks.data);
            })
            .catch((err) => {});
    }, []);

    if (feedbacks === null) return <FeedBackPlaceholder />;
    return (
        <div className={style.feedBack}>
            <h2 style={{ textAlign: "center", marginBottom: 30 }}>
                Feedback Responses
            </h2>
            <>
                {!feedbacks.length && (
                    <div className="w-100 mt-2">
                        <h5>You have no tasks 🤙</h5>
                    </div>
                )}
                <ul className="mt-2 d-flex flex-column list-unstyled">
                    {feedbacks.map((feedback, index) => (
                        <div
                            className={`${style.container} p-4 mb-4 mt-2`}
                            key={index}
                        >
                            <h5>{feedback.email}</h5>
                            <p className={style.content}>{feedback.content}</p>
                        </div>
                    ))}
                </ul>
            </>
        </div>
    );
};

export default FeedBackShow;
