import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {getAuthorizationHeader} from "../../../lib/auth";
import ErrorAlert from "../../../components/alerts/error";
import TextBox from "../../../components/textbox/textbox";
import {Col, Row} from "react-bootstrap";

import style from "../styles/panel.module.scss";
import InfoTab from "./info";
import UsersTab from "./users";
import SettingsTab from "./settings";

// every tab indexed
const tabs = {
    "Info": (farm, users) => <InfoTab farm={farm} users={users} />,
    "Users": (farm, users) => <UsersTab farm={farm} users={users} />,
    "Settings": (farm, users) => <SettingsTab farm={farm} users={users} />
};

const tabsNames = Object.keys(tabs);
const tabsLength = tabsNames.length;

/**
 * Tab navigation component
 * @param tab the tab state
 * @param setTab the tab reducer
 * @return {JSX.Element} the navigation component
 */
const TabNav = ({ tab, setTab }) => {
    const tabsNames = Object.keys(tabs);

    return (
        <Row className={`${style.tabDisplay} mb-2`}>
            <Col sm={1}>
                <button
                    onClick={() => {
                        if (tab === 0)
                            setTab(tabsLength - 1);
                        else
                            setTab(tab - 1);
                    }}
                    className={`
                        ${style.tabArrow} 
                        ${style.tabArrowLeft}
                    `}
                >
                    {"<"}
                </button>
            </Col>
            <Col>
                <div className={style.tabName}>
                    <p>{tabsNames[tab]}</p>
                </div>
            </Col>
            <Col sm={1}>
                <button
                    onClick={() => {
                        if (tab === tabsLength - 1)
                            setTab(0);
                        else
                            setTab(tab + 1);
                    }}
                    className={`
                        ${style.tabArrow} 
                        ${style.tabArrowRight}
                    `}
                >
                    {">"}
                </button>
            </Col>
        </Row>
    );
}

/**
 * Farm panel located at "/farms/panel"
 * @return {JSX.Element} the panel component
 */
const FarmPanel = () => {
    const params = useParams();

    const [farm, setFarm] = useState(undefined);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    // setting up tabs
    const [tab, setTab] = useState(0);

    // getting information about the farm
    useEffect(() => {
        axios.get(
            "/api/farms/users",
            {
                headers: getAuthorizationHeader(),
                params: { farmName: params["farm_name"] }
            }
        )
            .then(resp => setUsers(resp.data))
            .catch(err => setError(err.message));

        axios.get(
            "/api/farms/data",
            {
                headers: getAuthorizationHeader(),
                params: { farmName: params["farm_name"] }
            }
        )
            .then(resp => setFarm(resp.data))
            .catch(err => setError(err.message))
    }, [])

    if (error)
        return <ErrorAlert error={error} setError={setError} />;
    return (
        <TextBox className="form-container flex-column center">
            <TabNav tab={tab} setTab={setTab} />
            <div className={style.tab}>
                {tabs[tabsNames[tab]](farm, users)}
            </div>
        </TextBox>
    )
}

export default FarmPanel;