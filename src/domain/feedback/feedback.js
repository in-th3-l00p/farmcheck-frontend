import TextBox from "../../components/textbox/textbox";
import { Form, button } from "react-bootstrap";

import style from "./feedback.module.scss";

const Feedback = () => {
    return (
        <div className={style.feedback}>
            <TextBox className={style.layout}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control className={style.form} placeholder="Name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control className={style.form} placeholder="E-mail" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control className={style.form} placeholder="Message" as="textarea" rows={5}/>
                    </Form.Group>

                    <button className={style.button} type="submit">
                        Submit
                    </button>
                </Form>
            </TextBox>
        </div>
    );
}

export default Feedback;