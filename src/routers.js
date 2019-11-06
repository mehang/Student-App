import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import StudentPage from "./components/StudentPage";
import Home from "./components/Home";

export default function RouterConfig() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" key={1} component={Home}/>
                <Route exact path="/registration" key={2} component={StudentPage} />
            </Switch>
        </BrowserRouter>
    );
}