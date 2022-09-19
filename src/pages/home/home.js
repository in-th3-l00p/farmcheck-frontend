/**
 * Page at path "/"
 * @returns page's component
 */

import {Col, Row} from "react-bootstrap";
import ImageCarousel from "../../components/carousel/carousel";
import TextBox from "../../components/textbox/textbox";
import Footer from "../../components/footer/footer"
import {Button} from "../../components/buttons/buttons";

import style from "./home.module.scss";
import feature from "./features.module.scss";

const featuresIconsPath = [
    "/icons/features-icons/livedata.png",
    "/icons/features-icons/maintenance.png",
    "/icons/features-icons/surveillance.png",
    "/icons/features-icons/dictionary.png",
];

const FeatureIcon = ({className="", src, title, description}) => {
    return (
        <div 
            className={`${className} ${feature.feature_text} d-flex flex-column text-center pt-5`}
            style={{alignItems: "center"}}
        >
            <span className={feature.image}>
                <img src={src} alt="feature icon" />
            </span>
            <h3 className={`${feature.title} pt-3`}>{title}</h3> 
            <p className={feature.text}>{description}</p>
        </div> 
    );
}

const Home = () => {
    return (
        <div>
            <ImageCarousel
                className={style.carousel_image}
                images = {["/images/carousel-images/1.png", "/images/carousel-images/2.png", "/images/carousel-images/3.png"]}
                title = "FarmCheck"
                description = "We plan(t) the future"
            />

            <TextBox title="About us" className="text-center my-4">
                    <p className={style.about_text}>We are the CyberTech Farmers</p>
                    <Button 
                        className=""
                        onClick={()=> window.open("https://www.facebook.com/FarmCheck-105867298851897", "_blank")}
                    >
                        Learn more
                    </Button>
            </TextBox>

            <TextBox title="Features" className="d-grid my-4">
                <Row>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[0]} 
                            title="Dictionary" 
                            description="Our team indexed every agricultural term you will ever need"
                        />
                    </Col>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[1]} 
                            title="Live Data" 
                            description="We provide live data about your field"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[2]} 
                            title="Maintenance" 
                            description="No need to be scared of technology, we will always help you"
                        />
                    </Col>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[3]} 
                            title="Surveillance" 
                            description="If something ever happens, we got you covered"
                        />
                    </Col>
                </Row>

            </TextBox>
            <Footer />
        </div>
    );
}

export default Home;