import React from "react";

import LayoutWrapper from "../LayoutWrapper";
import logo from '../../logo.svg';

export function Home() {
    return (
        <div className="body-content">
            <div>This is a simple demonstration of react for CRUD services.</div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit source code and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </div>
    )
}

const WrappedHome = LayoutWrapper(Home);
export default WrappedHome;