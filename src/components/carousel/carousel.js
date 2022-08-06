import React from "react";
import { Carousel } from "react-bootstrap";

import "./carousel.scss";

export const ImageCarousel = () => {
    const images = ["/carousel-images/1.jpg", "/carousel-images/2.jpg", "/carousel-images/3.jpg"];

    return (
        <div className="carousel-container">
            <Carousel>
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            alt={image}
                            className="carousel-image"
                            src={`${image}`}
                            onDrag={(e) => e.preventDefault()}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <span className="carousel-text text-center">
                <h1 className="fw-bold">FarmCheck</h1>
                <h2 className="fw-light">Dc inca exist</h2>
            </span>
        </div>
    );
};

export default ImageCarousel;
