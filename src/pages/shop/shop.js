/**
 * Page at path "/shop"
 * @returns page's component
 */

import React from "react";
import ShopItem from "../../components/shop-item/shopitem";
import Footer from "../../components/footer/footer";
import { Col, Row } from "react-bootstrap";

import style from "./shop.module.scss";

const Shop = () => {
    return (
        <div>
            <div className={style.shop}>
                <div className={style.title}>
                    <h2 className={style.text}>Shop</h2>
                    <img src="/icons/shop.png" alt="shop icon" onClick={() => window.location.href="/shop/cart"}/>
                </div>
                <div className={style.items}>
                    <Row>
                        <Col>
                            <ShopItem 
                                className={style.item}
                                frontImageSrc="/images/shop-images/1.png"
                                images={["/images/shop-images/1.png"]}
                                text="Temperature + Humidity Sensor"
                                description=""
                                price="20"
                                componentslist={["Sensor 1", "Sensor 2", "ESP32", "Battery"]}
                            />
                        </Col>
                        <Col>
                            <ShopItem
                                className={style.item}
                                frontImageSrc="/images/shop-images/2.png"
                                images={["/images/shop-images/2.png"]}
                                text="Sensor Package 2"
                                description="yes yes yes"
                                price="20"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ShopItem 
                                className={style.item}
                                frontImageSrc="/images/shop-images/3.png"
                                images={["/images/shop-images/3.png"]}
                                text="Sensor Package 3"
                                description="yes yes yes"
                                price="20"
                            />
                        </Col>
                        <Col>
                            <ShopItem 
                                className={style.item}
                                frontImageSrc="/images/shop-images/4.png"
                                images={["/images/shop-images/4.png"]}
                                text="Sensor Package 4"
                                description="yes yes yes"
                                price="20"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ShopItem 
                                className={style.item} 
                                frontImageSrc="/images/shop-images/5.png"
                                images={["/images/shop-images/5.png"]}
                                text="Sensor Package 5"
                                description="yes yes yes"
                                price="20"
                            />
                        </Col>
                        <Col>
                            <ShopItem 
                                className={style.item}
                                frontImageSrc="/images/shop-images/6.png"
                                images={["/images/shop-images/6.png"]}
                                text="Sensor Package 6"
                                description="yes yes yes"
                                price="20"
                            />
                        </Col>
                    </Row>
                </div>      
            </div>
            <Footer/>  
        </div>
    )
}

export default Shop;