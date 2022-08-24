/**
 * Page at path "/"
 * @returns page's component
 */

import { Col, Row } from "react-bootstrap";
import ImageCarousel from "../../components/carousel/carousel";
import TextBox from "../../components/textbox/textbox";
import Footer from "../../components/footer/footer"

import style from "./home.module.scss";
import feature from "./features.module.scss";

const featuresIconsPath = [
    "/featuresIcons/dictionary.png",
    "/featuresIcons/livedata.png",
    "/featuresIcons/maintenance.png",
    "/featuresIcons/surveillance.png"
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
            <ImageCarousel/>

            <TextBox title="About us" className="text-center my-4">
                    <p className={style.about_text}>We are the CyberTech Farmers</p>
                    <button 
                        className={style.button}
                        onClick={()=> window.open("https://www.facebook.com/FarmCheck-105867298851897", "_blank")}>
                        Learn more
                    </button>
            </TextBox>

            <TextBox title="Features" className="d-grid my-4">
                <Row>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[0]} 
                            title="Dictionary" 
                            description="helloworld" 
                        />
                    </Col>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[1]} 
                            title="Live Data" 
                            description="helloworld" 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[2]} 
                            title="Maintenance" 
                            description="helloworld" 
                        />
                    </Col>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[3]} 
                            title="Surveillance" 
                            description="helloworld" 
                        />
                    </Col>
                </Row>

            </TextBox>
            <Footer />
        </div>
    );
}

export default Home;