import { Form } from "react-bootstrap";
import Footer from "../../components/footer/footer";
import WikiItem from "../../components/wiki-item/wikiitem";
import { Col, Row } from "react-bootstrap";
import React, { useState } from "react";

import style from "./wiki.module.scss";
import plants from "./plants.js";

const SearchbarButton = () => {
    return (
        <button
            className={style.search_button}
            onClick={() => {
                // console.log("lol");
            }}
        >
            <img alt="search" src="/icons/search.png" />
        </button>
    );
};

const Wiki = () => {
    const [value, setValue] = useState("");
    let counter = 0;

    return (
        <div>
            <div className={style.wiki}>
                <div className={`${style.title} pt-4`}>
                    <h2 className={style.text}>Crop Wiki</h2>
                    <Form className={style.search}>
                        <Form.Control
                            type="search"
                            className={`${style.search_tab} me`}
                            placeholder="Search..."
                            aria-label="Search"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <SearchbarButton />
                    </Form>
                </div>
                <div className={style.items}>
                    <Row>
                        {plants.map((item, index) => {
                            if (item.startsWith(value)) {
                                counter = 0;
                                return (
                                    <Col key={index}>
                                        <WikiItem
                                            className={style.item}
                                            imgSrc={`/images/wiki-images/${item}.png`}
                                            title={item}
                                            file={`./${item}.md`}
                                        />
                                    </Col>
                                );
                            }
                            counter++;
                            return undefined;
                        })}
                    </Row>
                    {counter === plants.length ? (
                        <h3 className={style.error}>
                            No plant with this name found.
                        </h3>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Wiki;
