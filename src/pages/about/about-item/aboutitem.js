import style from "./aboutitem.module.scss";

const AboutItem = ({ imageSrc, name, description }) => {
    return (
        <div className={style.container}>
            <img src={imageSrc} alt={name} />
            <h4 className={style.name}>{name}</h4>
            <h6>{description}</h6>
        </div>
    );
};

export default AboutItem;
