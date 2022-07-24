import React from "react";
import { Container } from "react-bootstrap";

import "./textbox.scss";

const TextBox = ({ title, children, className }) => {
    return (
        <Container className={`text-box my-4 p-5 ${className}`}>
            <h2>{title}</h2>
            {children}
        </Container>
    );
};

export default TextBox;
