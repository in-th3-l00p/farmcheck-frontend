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
    "/icons/features-icons/forecast.png",
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
            <h4 className={`${feature.title} pt-3`}>{title}</h4>
            <h5 className={feature.text}>{description}</h5>
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
                description="We plan(t) the future"
            />

            <TextBox title="About us" className="text-center my-4">
                <h5 className={style.aboutText}>
                    CyberTech Farmers is a team of aspiring programmers, brought
                    together by a desire to make farming more efficient by
                    bringing the combination of agriculture and technology into
                    the mainstream.
                </h5>
                <Button
                    className={style.button}
                    onClick={() => (window.location.href = "/about")}
                >
                    See more
                </Button>
            </TextBox>

            <TextBox title="Features" className="d-grid my-4">
                <Row>
                    <Col>
                        <FeatureIcon
                            src={featuresIconsPath[3]}
                            title="Crop Wiki"
                            description="All the information you need to know about planting all types of crops 
                            all in one place - our free CropWiki."
                        />
                    </Col>
                    <Col>
                        <FeatureIcon
                            src={featuresIconsPath[0]}
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
                            src={featuresIconsPath[1]}
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
