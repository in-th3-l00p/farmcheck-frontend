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

import React from "react";

import style from "./shopitem.module.scss";

const ShopItem = ({ image, imgSrc, text, href, className }) => {
    return (
        <div 
            className={`${style.container} ${className}`}
            onClick={() => window.location.href=href}
        >
            <img 
                alt={image}
                className=""
                src={imgSrc}
            />
            <h2 className={style.text}>{text}</h2>
        </div>
    )
}

export default ShopItem;