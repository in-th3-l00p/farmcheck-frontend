/**
 * Page at path "/"
 * @returns page's component
 */

import { Col, Row } from "react-bootstrap";
import ImageCarousel from "../../components/carousel/carousel";
import TextBox from "../../components/textbox/textbox";
import Footer from "../../components/footer/footer";
import { Button } from "../../components/buttons/buttons";

import style from "./home.module.scss";
import feature from "./features.module.scss";

const featuresIconsPath = [
    "/icons/features-icons/livedata.png",
    "/icons/features-icons/maintenance.png",
    "/icons/features-icons/surveillance.png",
    "/icons/features-icons/dictionary.png",
];

const FeatureIcon = ({ className = "", src, title, description }) => {
    return (
        <div
            className={`${className} ${feature.feature_text} d-flex flex-column text-center pt-5`}
            style={{ alignItems: "center" }}
        >
            <span className={feature.image}>
                <img src={src} alt="feature icon" />
            </span>
            <h3 className={`${feature.title} pt-3`}>{title}</h3>
            <p className={feature.text}>{description}</p>
        </div>
    );
};

const Home = () => {
    return (
        <div>
            <ImageCarousel
                className={style.carousel_image}
                images={[
                    "/images/carousel-images/1.png",
                    "/images/carousel-images/2.png",
                    "/images/carousel-images/3.png",
                ]}
                title="FarmCheck"
                description="We plant the future"
            />

            <TextBox title="About us" className="text-center my-4">
                <p className={style.about_text}>
                    CyberTech Farmers is a team of aspiring programmers, brought
                    together by a desire to make farming more efficient by
                    bringing the combination of agriculture and technology into
                    the mainstream.
                </p>
                <Button
                    className={style.button}
                    onClick={() =>
                        window.open(
                            "https://www.facebook.com/FarmCheck-105867298851897",
                            "_blank"
                        )
                    }
                >
                    See more
                </Button>
            </TextBox>

            <TextBox title="Features" className="d-grid my-4">
                <Row>
                    <Col>
                        <FeatureIcon
                            src={featuresIconsPath[0]}
                            title="Dictionary"
                            description="All the information you need to know about planting all types of crops  
                            (from carrots to asparagus?)  all in one place - our free CropWiki."
                        />
                    </Col>
                    <Col>
                        <FeatureIcon
                            src={featuresIconsPath[1]}
                            title="Live Data"
                            description="Our hardware package brings you fresh data right from your own field, 
                            with just a few sensors and clicks. Nothing easier than that."
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FeatureIcon
                            src={featuresIconsPath[2]}
                            title="Forecast"
                            description="We help you keep an eye on the weather in your area easily, by 
                            integrating an alert system that warns you of extreme conditions."
                        />
                    </Col>
                    <Col>
                        <FeatureIcon
                            src={featuresIconsPath[3]}
                            title="Maintenance"
                            description="Your sensors are in good hands. If anything happens to them, just 
                            give us a call. We'll take care of everything, while you sit back and relax."
                        />
                    </Col>
                </Row>
            </TextBox>
            <Footer />
        </div>
    );
};

export default Home;
