import React from "react";
import { Container } from "react-bootstrap";

import "./textbox.scss";

/**
 * Main component for showing elements in a responsive way.
 * @param {*} props.title the title of the textbox
 * @param {*} props.children the children components
 * @param {*} props.className additional class names
 * @param {*} props.style additional styling
 * @returns 
 */
const TextBox = ({ title, children, className="", style={} }) => {
    return (
        <Container 
            className={`text-box p-5 ${className}`} 
            style={style}
        >
            <h2 className="text-center">{title}</h2>
            {children}
        </Container>
    );
};

export default TextBox;
