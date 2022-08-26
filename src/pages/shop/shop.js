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
                                image="yes" 
                                imgSrc="/images/shop-images/1.png"
                                text="Sensor Package 1"
                                href="/sensor-package-1"
                                className={style.item}
                            />
                        </Col>
                        <Col>
                            <ShopItem 
                                image="yes" 
                                imgSrc="/images/shop-images/2.png"
                                text="Sensor Package 2"
                                href="/sensor-package-2"
                                className={style.item}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ShopItem 
                                image="yes" 
                                imgSrc="/images/shop-images/3.png"
                                text="Sensor Package 3"
                                href="/sensor-package-3"
                                className={style.item}
                            />
                        </Col>
                        <Col>
                            <ShopItem 
                                image="yes" 
                                imgSrc="/images/shop-images/4.png"
                                text="Sensor Package 4"
                                href="/sensor-package-4"
                                className={style.item}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ShopItem 
                                image="yes" 
                                imgSrc="/images/shop-images/5.png"
                                text="Sensor Package 5"
                                href="/sensor-package-5"
                                className={style.item}
                            />
                        </Col>
                        <Col>
                            <ShopItem 
                                image="yes" 
                                imgSrc="/images/shop-images/6.png"
                                text="Sensor Package 6"
                                href="/sensor-package-6"
                                className={style.item}
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