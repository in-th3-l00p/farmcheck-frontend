import style from "./aboutitem.module.scss";

const AboutItem = ({ imageSrc, name, description }) => {
    return (
        <div className={style.container}>
            <img src={imageSrc} alt={name} />
            <h3 className={style.name}>{name}</h3>
            <h5>{description}</h5>
        </div>
    );
};

export default AboutItem;
