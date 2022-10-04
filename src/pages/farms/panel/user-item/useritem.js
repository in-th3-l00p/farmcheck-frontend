import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/buttons/buttons";

import style from "./useritem.module.scss";

const UserItem = ({
    className,
    user,
    controls,
    setRemoveUser,
    setShowRemoveUserModal,
    setChangeRoleUser,
    setShowChangeRoleModal,
}) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleWindowResize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const roles = ["Owner", "Admin", "Worker"];
    const roleType = roles[user.farmRole - 1];
    console.log(roleType, user.farmRole)

    return (
        <>
            <div className={`${style.container} ${className}`}>
                <div className="d-flex">
                    <img
                        alt="user"
                        src={
                            roleType === "Worker"
                                ? "/images/default-worker-picture.png"
                                : "/images/default-admin-picture.png"
                        }
                    />
                    <div className={style.user}>
                        <div className={style.usernameBox}>
                            <h4 className={style.username}>
                                <strong>{user.login}</strong>
                            </h4>
                            <h5 className={style.role}>{roleType}</h5>
                        </div>
                        {width > 420 ? (
                            <>
                                <h5 className={style.name}>
                                    First Name:{" "}
                                    <strong>{user.firstName}</strong>
                                </h5>
                                <h5 className={style.name}>
                                    Last Name: <strong>{user.lastName}</strong>
                                </h5>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    {width > 820 && controls ? (
                        <div style={{ width: 120, marginLeft: "auto" }}>
                            <Button
                                onClick={() => {
                                    setRemoveUser(user);
                                    setShowRemoveUserModal(true);
                                }}
                                className={`${style.button} bg-danger text-white`}
                            >
                                Remove
                            </Button>
                            <Button
                                onClick={() => {
                                    setChangeRoleUser(user);
                                    setShowChangeRoleModal(true);
                                }}
                                className={style.button}
                            >
                                Change role
                            </Button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {width <= 420 ? (
                    <div style={{ marginTop: 15 }}>
                        <h5 className={style.name}>
                            First Name: <strong>{user.firstName}</strong>
                        </h5>
                        <h5 className={style.name}>
                            Last Name: <strong>{user.lastName}</strong>
                        </h5>
                    </div>
                ) : (
                    <></>
                )}

                {width < 820 && controls ? (
                    <div className="d-flex">
                        <Button
                            onClick={() => {
                                setRemoveUser(user);
                                setShowRemoveUserModal(true);
                            }}
                            className={`${style.button} bg-danger text-white`}
                        >
                            Remove
                        </Button>
                        <Button
                            onClick={() => {
                                setChangeRoleUser(user);
                                setShowChangeRoleModal(true);
                            }}
                            className={style.button}
                        >
                            Change role
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default UserItem;
