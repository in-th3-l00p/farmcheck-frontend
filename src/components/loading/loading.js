import { Spinner } from "react-bootstrap";
import style from "./loading.module.scss";

const Loading = () => {
    return (
        <div className={style.loading}>
            <h1>Loading...</h1>
            <Spinner 
                animation="border" 
                variant="success" 
                className={style.spinner}
            />
        </div>
    )
}

export default Loading;