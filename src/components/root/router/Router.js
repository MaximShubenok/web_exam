import React from 'react';
import {Switch, Route} from "react-router-dom";
import {Info} from "../../pages/info/Info";
import Students from "../../pages/students/Students";
import {Edit} from "../../pages/edit/Edit";

export const Router = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <Students />
            </Route>
            <Route path={'/info'}>
                <Info />
            </Route>
            <Route path={'/edit/:id'}>
                <Edit />
            </Route>
        </Switch>
    )
};