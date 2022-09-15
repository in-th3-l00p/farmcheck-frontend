import Footer from "../../components/footer/footer";
import { Button } from "../../components/buttons/buttons";
import AboutItem from "../../components/about-item/aboutitem";
import { Col, Row } from "react-bootstrap";

import style from "./about.module.scss";

const About = () => {
    return (
        <div>
            <div className={style.about}>
                <div className="pt-4">
                    <div className={style.title}>
                        <h1>Farmcheck</h1>
                        <h3>Just another team. (slogan goes here)</h3>
                    </div>
                    <div className={style.image}>
                        <img src="/images/team.png" alt="team" />
                    </div>
                    <div className={style.line} />
                    <div className={`${style.description} py-4`}>
                        <h2>Together we are strong.</h2>
                        <h4>
                            "Our goal is to build yes that yes in idk how to
                            explain but haha lets go :)"
                        </h4>
                    </div>
                    <div className={style.line} />
                    <div className={`${style.profiles} d-grid gap-3 py-5`}>
                        <h2 className={style.team_title}>
                            Meet our amazing team
                        </h2>
                        <div className={style.profile}>
                            <Row>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/1.png"
                                        name="Random Dude"
                                        description="Front-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/1.png"
                                        name="Random Dude"
                                        description="Front-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/1.png"
                                        name="Random Dude"
                                        description="Front-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/1.png"
                                        name="Random Dude"
                                        description="Front-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/1.png"
                                        name="Random Dude"
                                        description="Front-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/1.png"
                                        name="Random Dude"
                                        description="Front-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/1.png"
                                        name="Random Dude"
                                        description="Front-end Developer"
                                    />
                                </Col>
                                <Col>
                                    <AboutItem
                                        imageSrc="/images/about-images/1.png"
                                        name="Random Dude"
                                        description="Front-end Developer"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className={style.line} />
                    <div className={`${style.question} py-5`}>
                        <div>
                            <h2>
                                Have a question or want to learn more about our
                                team?
                            </h2>
                            <h5>
                                Look at our development through this project.
                            </h5>
                            <Button
                                className={`${style.button} my-4`}
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
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
