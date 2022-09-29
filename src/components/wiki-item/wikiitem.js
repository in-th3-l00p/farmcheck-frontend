import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import style from "./wikiitem.module.scss";

const transformToTitle = (word) => {
    word = word.replace(/_/g, " ");
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const WikiItemInterface = ({ isOpened, setOpen, children }) => {
    return (
        <>
            {isOpened && (
                <div className={style.item}>
                    <span
                        className={style.behind}
                        onClick={() => setOpen(false)}
                    />
                    <div className={`${style.interface} px-3 py-3`}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

const WikiItem = ({ className, imgSrc, title, file = "./error.md" }) => {
    const [isItemOpen, setItemOpen] = useState(false);
    const [content, setContent] = useState("");

    useEffect(() => {
        document.body.style.overflow = isItemOpen ? "hidden" : "unset";
    }, [isItemOpen]);

    useEffect(() => {
        fetch(file)
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);

    return (
        <>
            <div
                className={`${style.container} ${className}`}
                onClick={() => {
                    setItemOpen(!isItemOpen);
                }}
            >
                <img alt="yes" src={imgSrc} />
                <h2 className={style.title}>{transformToTitle(title)}</h2>
            </div>
            <WikiItemInterface isOpened={isItemOpen} setOpen={setItemOpen}>
                <div>
                    <ReactMarkdown children={content} />
                </div>
            </WikiItemInterface>
        </>
    );
};

export default WikiItem;
