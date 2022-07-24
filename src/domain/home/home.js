/**
 * Page at path "/"
 * @returns page's component
 */

import ImageCarousel from "../../components/carousel/carousel"
import TextBox from "../../components/textbox/textbox";

import style from "./home.module.scss";

export const Home = () => {
    return (
        <div>
            <ImageCarousel/>

            <TextBox title="About us" className={`${style.about} text-center`}>
                    <p className={style.aboutText}>We are the CyberTech Farmers</p>
                    <button 
                        className={style.button}
                        onClick={()=> window.open("https://www.facebook.com/FarmCheck-105867298851897", "_blank")}>
                        Learn more
                    </button>
            </TextBox>
        </div>
    );
}

export default Home;