/**
 * Page at path "/"
 * @returns page's component
 */

import { Col, Grid, Row } from "react-bootstrap";
import ImageCarousel from "../../components/carousel/carousel";
import TextBox from "../../components/textbox/textbox";

import style from "./home.module.scss";
import features from "./features.module.scss";

const featuresIconsPath = [
    "/featuresIcons/dictionary.jpeg",
    "/featuresIcons/livedata.jpeg",
    "/featuresIcons/maintenance.jpeg",
    "/featuresIcons/surveillance.jpeg"
];

const FeatureIcon = ({className="", src, title, description}) => {
    return (
        <div 
            className={`${className} d-flex flex-column gap-3 text-center`}
            style={{alignItems: "center"}}
        >
            <span className={features.image}>
                <img src={src} alt="feature icon" />
            </span>
            <h3>{title}</h3> 
            <p>{description}</p>
        </div> 
    );
}

export const Home = () => {
    return (
        <div>
            <ImageCarousel/>

            <TextBox title="About us" className="text-center">
                    <p className={style.aboutText}>We are the CyberTech Farmers</p>
                    <button 
                        className={style.button}
                        onClick={()=> window.open("https://www.facebook.com/FarmCheck-105867298851897", "_blank")}>
                        Learn more
                    </button>
            </TextBox>

            <TextBox title="Features" className="d-grid">
                <Row>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[0]} 
                            title="test" 
                            description="helloworld" 
                        />
                    </Col>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[1]} 
                            title="test" 
                            description="helloworld" 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[2]} 
                            title="test" 
                            description="helloworld" 
                        />
                    </Col>
                    <Col>
                        <FeatureIcon 
                            src={featuresIconsPath[3]} 
                            title="test" 
                            description="helloworld" 
                        />
                    </Col>
                </Row>

            </TextBox>
        </div>
    );
}

export default Home;