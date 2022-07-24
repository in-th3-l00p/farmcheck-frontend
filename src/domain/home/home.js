/**
 * Page at path "/"
 * @returns page's component
 */

import ImageCarousel from "../../components/carousel/carousel"
import TextBox from "../../components/textbox/textbox";
import { Button } from "react-bootstrap";

import "./home.scss";

export const Home = () => {
    return (
        <div>
            <ImageCarousel/>

            <TextBox title="About us" className="text-center about">
                    <p className="about-text ">We are the CyberTech Farmers</p>
                    <Button 
                        className="about-button" 
                        onClick={()=> window.open("https://www.facebook.com/FarmCheck-105867298851897", "_blank")}>
                        Learn more
                    </Button>
            </TextBox>
        </div>
    );
}

export default Home;