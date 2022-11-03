/**
 * Page at path "/shop"
 * @returns page's component
 */

import React from "react";
import ShopItem from "./shop-item/shopitem";
import { Col, Row } from "react-bootstrap";

import style from "./shop.module.scss";

const Shop = () => {
    return (
        <div>
            <div className={style.shop}>
                <div className={style.title}>
                    <h2 className={style.text}>Shop</h2>
                    <img
                        src="/icons/cart.png"
                        alt="shop icon"
                        onClick={() => (window.location.href = "/shop/cart")}
                    />
                </div>
                <div className={style.items}>
                    <Row>
                        <Col>
                            <ShopItem
                                className={style.item}
                                frontImageSrc="/images/shop-images/basicSensor.png"
                                images={["/images/shop-images/basicSensor.png"]}
                                text="Basic Sensor"
                                description="The basic sensor has the ability to get the temperature and humidity both from air and soil. Upon turning on the sensor will create a hotspot on which the user must connect and give informations about a wifi connection and the token found on his account. After the connection the sensor will start sending data at the token showing it on the website."
                                price="200"
                                componentslist={[
                                    "ESP32 microcontroller",
                                    "DHT11 sensor",
                                    "Soil moisture and temperature sensor",
                                ]}
                            />
                        </Col>
                        <Col>
                            <ShopItem
                                className={style.item}
                                frontImageSrc="/images/shop-images/advancedSensor.png"
                                images={[
                                    "/images/shop-images/advancedSensor.png",
                                ]}
                                text="Advanced Sensor"
                                description="The advanced sensor has the ability to get the temperature and humidity from air and 3 locations from the soil. Using an upgraded sensor it can get more precise data and from different deepths."
                                price="350"
                                componentslist={[
                                    "ESP32 microcontroller",
                                    "DHT22 sensor",
                                    "Capacitive Moisture sensor",
                                    "Soil temperature sensor",
                                ]}
                                disabled={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ShopItem
                                className={style.item}
                                frontImageSrc="/images/shop-images/wifiModule.png"
                                images={["/images/shop-images/wifiModule.png"]}
                                text="WiFi Module"
                                description="The Wifi Module is used in places where signal or wifi has a bad connection. It can expand the cover range of WiFi up to 20km and allow all sensors in that range connect to the server."
                                price="250"
                                disabled={true}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Shop;
