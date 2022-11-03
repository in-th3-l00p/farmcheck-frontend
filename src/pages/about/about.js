import Footer from "../../components/footer/footer";
import { Button } from "../../components/buttons/buttons";
import AboutItem from "./about-item/aboutitem";
import { Col, Row } from "react-bootstrap";

import style from "./about.module.scss";

const About = () => {
    return (
        <div>
            <div className={style.about}>
                <div className="pt-4">
                    <div className={style.title}>
                        <h2>Farmcheck</h2>
                        <h4>We plant the future.</h4>
                    </div>
                    <div className={style.image}>
                        <img src="/images/about-images/team.jpg" alt="team" />
                    </div>
                    <div className={style.line} />
                    <div className={`${style.description} py-4`}>
                        <h5 style={{ fontWeight: 400, textAlign: "justify" }}>
                            We are a team of students from CNI “Grigore Moisil”
                            Brasov. Brought together by DpIT, we strive to
                            create an app that will help farmers and companies
                            in the agricultural sector, by making their work
                            more efficient. We hope we can learn from this
                            experience, but also enjoy ourselves and have fun in
                            the process {"<"}3.
                        </h5>
                    </div>
                    <div className={style.line} />
                    <div className={`${style.team} d-grid gap-3 py-5`}>
                        <h3 className={style.team_title}>
                            Meet our amazing team
                        </h3>
                        <div className={style.profile}>
                            <Row>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/ionut.jpg"
                                        name="Bene Ionut-Matei"
                                        description="Embedded Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/alex.jpg"
                                        name="Bleotu Alexandru-David"
                                        description="Front-end Developer/Embedded Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/silviu.jpg"
                                        name="Curuciuc Silviu"
                                        description="Mentor DpIT"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/cristi.jpg"
                                        name="George Cristiany-Dan"
                                        description="Back-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/miha.jpg"
                                        name="Russu Mihaela"
                                        description="Front-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/edu.jpg"
                                        name="Serban Eduard-Valentin"
                                        description="Back-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/cata.jpg"
                                        name="Tisca Catalin-George"
                                        description="Front-end Developer/Back-end Developer"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className={style.line} />
                    <div className={`${style.question} py-5`}>
                        <div className={style.text}>
                            <h3>
                                Have a question or want to learn more about our
                                team?
                            </h3>
                            <h5>
                                Look at our development through this project.
                            </h5>
                            <Button
                                className={`${style.button} mb-4`}
                                onClick={() =>
                                    window.open(
                                        "https://www.facebook.com/FarmCheck-105867298851897",
                                        "_blank"
                                    )
                                }
                            >
                                Learn more
                            </Button>
                        </div>
                        <div className={style.img_div}>
                            <img alt="about us" src="/images/aboutus.png" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
