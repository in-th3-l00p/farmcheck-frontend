import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ErrorAlert from "../../../components/alerts/error";
import TextBox from "../../../components/textbox/textbox";
import {Col, Row} from "react-bootstrap";
import farmService from "../../../lib/services/farmService";

import style from "../styles/panel.module.scss";

import InfoTab from "./info";
import UsersTab from "./users";
import SettingsTab from "./settings";
import ChatTab from "./chat";

// every tab indexed
const tabs = {
    "Info": (farm, users) => <InfoTab farm={farm} users={users} />,
    "Users": (farm, users) => <UsersTab farm={farm} users={users} />,
    "Chat": (farm, users) => <ChatTab farm={farm} users={users} />,
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
                    onClick={({ target }) => {
                        if (tab === 0)
                            setTab(tabsLength - 1);
                        else
                            setTab(tab - 1);
                        target.blur();
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
                    onClick={({ target }) => {
                        if (tab === tabsLength - 1)
                            setTab(0);
                        else
                            setTab(tab + 1);
                        target.blur();
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
        farmService.getFarm(params["farm_id"])
            .then(resp => setFarm(resp))
            .catch(err => setError(err.message))

        farmService.getFarmUsers(params["farm_id"])
            .then(resp => setUsers(resp))
            .catch(err => setError(err.message));
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