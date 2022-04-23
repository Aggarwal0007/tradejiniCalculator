import { NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PORTAL_MENU_TYPE } from "common/Types";
import { PORTAL_MENULIST } from "common/Constants";

const PortalMenu = () => {

    const locate = useLocation();

    const [
        selectedMenu, setselectedMenu
    ] = useState(PORTAL_MENULIST[ 0 ].path);

    useEffect(() => {
        setselectedMenu(locate.pathname);
    }, [
        locate.pathname
    ]);

    const onChangeMenu = (menuItem: PORTAL_MENU_TYPE) => {
        setselectedMenu(menuItem.path);
    };

    return (
        <>
            {
                PORTAL_MENULIST && PORTAL_MENULIST.length ?
                    PORTAL_MENULIST.map((item, idx) => {

                        return (
                            <NavLink 
                                key = {idx}
                                className={`${item.path === selectedMenu ? "active-menu": ""} portal-menu-item`}
                                to={item.path}
                                onClick = {() => {
                                    return onChangeMenu(item); 
                                }}
                            >
                                {item.label}
                            </NavLink>
                        );
                    })
                    :
                    null
            }
        </>
    );
};

export default PortalMenu;
