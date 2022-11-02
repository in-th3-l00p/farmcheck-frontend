/**
 * /**
 * Shop item component.
 * @param props.image image's alt
 * @param props.imgSrc source for the item's image
 * @param props.text text to be shown in the item
 * @param props.href link for onClick redirect
 * @param props.onClick redirect to the href link
 * @param props.className classes of the button
 * @returns the shop item
 */

import React, { useState, useEffect } from "react";
import ImageCarousel from "../../../components/carousel/carousel";
import { Button } from "../../../components/buttons/buttons";

import style from "./shopitem.module.scss";

const ShopItemInterface = ({ isOpened, setOpen, children }) => {
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

const ShopItem = ({
    frontImageSrc,
    images,
    text,
    className,
    description,
    price,
    componentslist = [],
    disabled = false,
}) => {
    const [isItemOpen, setItemOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isItemOpen ? "hidden" : "unset";
    }, [isItemOpen]);

    return (
        <div>
            <div
                className={`${style.container} ${className}`}
                onClick={() => {
                    setItemOpen(!isItemOpen);
                }}
            >
                <img alt="yes" src={frontImageSrc} />
                <h3 className={style.text}>{text}</h3>
            </div>
            <ShopItemInterface isOpened={isItemOpen} setOpen={setItemOpen}>
                <ImageCarousel
                    className={style.carousel_image}
                    images={images}
                    classNameIndicators={style.carousel_indicators}
                    sliding={false}
                />
                <div className={style.text}>
                    <h4>{text}</h4>
                    <h6 style={{ fontWeight: 400, textAlign: "justify" }}>
                        {description}
                    </h6>
                    <div className={style.list}>
                        {componentslist.length === 0 ? (
                            <></>
                        ) : (
                            <div>
                                <h5>Components: </h5>
                                <ul className={style.list}>
                                    {componentslist.map((component, index) => (
                                        <li key={index}>
                                            <h6 style={{ fontWeight: 400 }}>
                                                {component}
                                            </h6>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className={style.price}>
                    <h4>Price: {price} RON</h4>
                    <Button className={style.button} disabled={disabled}>
                        {disabled ? "Coming soon" : "Add to cart"}
                    </Button>
                </div>
            </ShopItemInterface>
        </div>
    );
};

export default ShopItem;
