import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Alert, Col, Row } from "react-bootstrap";
import farmService from "../../../lib/services/farmService";

import style from "../styles/panel.module.scss";

import InfoTab from "./info";
import UsersTab from "./users";
import OwnerSettingsTab from "./settings/ownerSettings";
import ChatTab from "./chat";
import NotFound from "../../notFound";
import AdminSettingsTab from "./settings/adminSettings";
import WorkerSettingsTab from "./settings/workerSettings";
import SensorsTab from "./sensors";

/**
 * Tab navigation component
 * @param tabs index object
 * @param tab the tab state
 * @param setTab the tab reducer
 * @return {JSX.Element} the navigation component
 */
const TabNav = ({ tabs, tab, setTab }) => {
    return (
        <div className={style.tabDisplay}>
            <p
                onClick={({ target }) => {
                    if (tab === 0) setTab(tabs.length - 1);
                    else setTab(tab - 1);
                    target.blur();
                }}
                className={style.tabArrow}
            >
                <span className={style.buttonText}>{"<"}</span>
            </p>
            <div className={style.tabName}>
                <h3>{tabs[tab]}</h3>
            </div>
            <p
                onClick={({ target }) => {
                    if (tab === tabs.length - 1) setTab(0);
                    else setTab(tab + 1);
                    target.blur();
                }}
                className={style.tabArrow}
            >
                <span className={style.buttonText}>{">"}</span>
            </p>
        </div>
    );
};

/**
 * Layout component for displaying the tabs
 * @param tabs all the tabs
 * @param tab tab state
 * @param setTab tab state reducer
 * @param children child components
 * @return the layout component
 */
const PanelLayout = ({ tabs, tab, setTab, children }) => {
    return (
        <div className={`${style.textBox} form-container flex-column center`}>
            <TabNav tabs={tabs} tab={tab} setTab={setTab} />
            <div className={style.tab}>{children}</div>
        </div>
    );
};

/**
 * Tabs used by the owner
 * @param farm farm object
 * @param users users array
 * @return {JSX.Element} the tabs
 */
const OwnerTabs = ({ farm, users }) => {
    const [tab, setTab] = useState(0);
    const tabs = ["Info", "Users", "Sensors", "Chat", "Settings"];

    return (
        <PanelLayout tabs={tabs} tab={tab} setTab={setTab}>
            {tab === 0 && <InfoTab farm={farm} users={users} />}
            {tab === 1 && <UsersTab farm={farm} users={users} />}
            {tab === 2 && <SensorsTab farm={farm} users={users} />}
            {tab === 3 && <ChatTab farm={farm} users={users} />}
            {tab === 4 && <OwnerSettingsTab farm={farm} users={users} />}
        </PanelLayout>
    );
};

/**
 * Tabs used by an admin
 * @param farm farm object
 * @param users users array
 * @return {JSX.Element} the tabs
 */
const AdminTabs = ({ farm, users }) => {
    const [tab, setTab] = useState(0);
    const tabs = ["Info", "Users", "Sensors", "Chat", "Settings"];

    return (
        <PanelLayout tabs={tabs} tab={tab} setTab={setTab}>
            {tab === 0 && <InfoTab farm={farm} users={users} />}
            {tab === 1 && <UsersTab farm={farm} users={users} />}
            {tab === 2 && <SensorsTab farm={farm} users={users} />}
            {tab === 3 && <ChatTab farm={farm} users={users} />}
            {tab === 4 && <AdminSettingsTab farm={farm} users={users} />}
        </PanelLayout>
    );
};

/**
 * Tabs used by a worker
 * @param farm farm object
 * @param users users array
 * @return {JSX.Element} the tabs
 */
const WorkerTabs = ({ farm, users }) => {
    const [tab, setTab] = useState(0);
    const tabs = ["Info", "Sensors", "Chat", "Settings"];

    return (
        <PanelLayout tabs={tabs} tab={tab} setTab={setTab}>
            {tab === 0 && <InfoTab farm={farm} users={users} />}
            {tab === 1 && <SensorsTab farm={farm} users={users} />}
            {tab === 2 && <ChatTab farm={farm} users={users} />}
            {tab === 3 && <WorkerSettingsTab farm={farm} users={users} />}
        </PanelLayout>
    );
};

/**
 * Farm panel located at "/farms/panel"
 * @return {JSX.Element} the panel component
 */
const FarmPanel = () => {
    const params = useParams();

    const [farm, setFarm] = useState(undefined);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    // getting information about the farm
    useEffect(() => {
        farmService
            .getFarm(params["farm_id"])
            .then((resp) => setFarm(resp))
            .catch((err) => setError(err.message));

        farmService
            .getFarmUsers(params["farm_id"])
            .then((resp) => setUsers(resp))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <NotFound />;
    if (farm === undefined || users === []) return <></>;
    return (
        <>
            {farm.role === 1 && <OwnerTabs farm={farm} users={users} />}
            {farm.role === 2 && <AdminTabs farm={farm} users={users} />}
            {farm.role === 3 && <WorkerTabs farm={farm} users={users} />}
        </>
    );
};

export default FarmPanel;
