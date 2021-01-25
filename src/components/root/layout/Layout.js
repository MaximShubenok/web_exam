import React from 'react';
import {Router} from "../router/Router";
import {NavLink} from "react-router-dom";

export const Layout = () => {
    return (
        <div className={'Layout'}>
            <div className="Layout__nav">
                <div className="Layout__nav_logo">
                    <NavLink to={'/'} exact>
                        Shubenok0955
                    </NavLink>
                </div>
                <div className="Layout__nav_menu">
                    <NavLink to={'/'} exact>
                        Main
                    </NavLink>
                    <NavLink to={'/info'}>
                        Info
                    </NavLink>
                </div>
            </div>
            <div className="Layout__content">
                <Router />
            </div>
        </div>
    )
};