import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import farmService from "../../../lib/services/farmService";

import style from "../styles/panel.module.scss";

import UsersTab from "./users";
import OwnerSettingsTab from "./settings/ownerSettings";
import ChatTab from "./chat";
import NotFound from "../../notFound";
import AdminSettingsTab from "./settings/adminSettings";
import WorkerSettingsTab from "./settings/workerSettings";
import WorkerTodoTab from "./todo/workerTodo";
import SensorsTab from "./sensors";
import AdminTodoTab from "./todo/adminTodo";
import { Container, Row, Col } from "react-bootstrap";

const FarmInfo = ({ farm, users }) => {
    return (
        <Container className={`d-flex gap-3 p-1 w-100 mb-3 ${style.info}`}>
            <img
                src={"/images/default-farm-picture.png"}
                width={200}
                height={200}
                alt="profile"
            />
            <div className={style.text}>
                <h3 className={style.name}>{farm.name}</h3>
                <p className={style.elements}>{farm.description}</p>
                <h5 className={style.elements}>
                    Number of users: {users.length}
                </h5>
            </div>
        </Container>
    );
};

/**
 * Tab navigation component
 * @param tabs index object
 * @param currentTab the tab state
 * @param setCurrentTab the tab reducer
 * @return {JSX.Element} the navigation component
 */
const TabNav = ({ tabs, currentTab, setCurrentTab }) => {
    return (
        <Row style={{width: "80%"}}>
            {tabs.map((tab, index) => (
                <Col key={index} className={"d-flex justify-content-center"}>
                    <button
                        className={"w-100 h-100 text-center"}
                        disabled={tabs[currentTab] === tab}
                        onClick={() => setCurrentTab(index)}
                    >
                        {tab}
                    </button>
                </Col>
            ))}
        </Row>
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
const PanelLayout = ({ farm, users, tabs, tab, setTab, children }) => {
    if (!farm || !users)
        return <p>loading..</p>;

    return (
        <div
            className={`${style.textBox} form-container flex-column center h-80`}
        >
            <FarmInfo farm={farm} users={users} />
            <TabNav tabs={tabs} currentTab={tab} setCurrentTab={setTab} />
            <div className={style.tab}>{children}</div>
        </div>
    );
};

/**
 * Tabs used by the owner
 * @param farm farm object
 * @param users users array
 * @param setUsers users array state reducer
 * @return {JSX.Element} the tabs
 */
const OwnerTabs = ({ farm, users, setUsers }) => {
    const [tab, setTab] = useState(0);
    const tabs = ["Users", "Sensors", "Chat", "Todo", "Settings"];

    return (
        <PanelLayout
            farm={farm}
            users={users}
            tabs={tabs}
            tab={tab}
            setTab={setTab}
        >
            {tab === 0 && (
                <UsersTab farm={farm} users={users} setUsers={setUsers} />
            )}
            {tab === 1 && <SensorsTab farm={farm} users={users} />}
            {tab === 2 && <ChatTab farm={farm} users={users} />}
            {tab === 3 && <AdminTodoTab farm={farm} users={users} />}
            {tab === 4 && <OwnerSettingsTab farm={farm} users={users} />}
        </PanelLayout>
    );
};

/**
 * Tabs used by an admin
 * @param farm farm object
 * @param users users array
 * @param setUsers users array state reducer
 * @return {JSX.Element} the tabs
 */
const AdminTabs = ({ farm, users, setUsers }) => {
    const [tab, setTab] = useState(0);
    const tabs = ["Users", "Sensors", "Chat", "Todo", "Settings"];

    return (
        <PanelLayout
            farm={farm}
            users={users}
            tabs={tabs}
            tab={tab}
            setTab={setTab}
        >
            {tab === 0 && (
                <UsersTab farm={farm} users={users} setUsers={setUsers} />
            )}
            {tab === 1 && <SensorsTab farm={farm} users={users} />}
            {tab === 2 && <ChatTab farm={farm} users={users} />}
            {tab === 3 && <AdminTodoTab farm={farm} users={users} />}
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
    const tabs = ["Sensors", "Chat", "Todo", "Settings"];

    return (
        <PanelLayout
            farm={farm}
            users={users}
            tabs={tabs}
            tab={tab}
            setTab={setTab}
        >
            {tab === 0 && <SensorsTab farm={farm} users={users} />}
            {tab === 1 && <ChatTab farm={farm} users={users} />}
            {tab === 2 && <WorkerTodoTab farm={farm} users={users} />}
            {tab === 3 && <WorkerSettingsTab farm={farm} users={users} />}
        </PanelLayout>
    );
};

const FarmPanelPlaceholder = () => {
    return (
        <div className={`${style.textBox} form-container flex-column center`}>
            <span className="w-100 text-center my-5">
                <h1>loading...</h1>
            </span>
        </div>
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
    if (farm === undefined || users === []) return <FarmPanelPlaceholder />;
    return (
        <div>
            {farm.role === 1 && (
                <OwnerTabs farm={farm} users={users} setUsers={setUsers} />
            )}
            {farm.role === 2 && (
                <AdminTabs farm={farm} users={users} setUsers={setUsers} />
            )}
            {farm.role === 3 && <WorkerTabs farm={farm} users={users} />}
        </div>
    );
};

export default FarmPanel;
