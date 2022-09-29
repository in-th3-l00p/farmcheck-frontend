import React from "react";
import { Carousel } from "react-bootstrap";

import style from "./carousel.module.scss";

export const ImageCarousel = ({
    className,
    images,
    title = "",
    description = "",
    classNameIndicators = undefined,
    sliding = true,
}) => {
    return (
        <div className={style.container}>
            <Carousel
                className={`${style.carousel} ${
                    classNameIndicators === undefined
                        ? style.indicators
                        : classNameIndicators
                }`}
                interval={sliding ? 5000 : null}
            >
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            alt={image}
                            className={`${className} ${style.image}`}
                            src={`${image}`}
                            onDrag={(e) => e.preventDefault()}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <span className={`${style.text} text-center`}>
                <h1 className="fw-bold">{title}</h1>
                <h2 className="fw-light fst-italic">"{description}"</h2>
            </span>
        </div>
    );
};

export default ImageCarousel;
