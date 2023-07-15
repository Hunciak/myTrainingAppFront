import React from "react";
import {Sidebar} from "../compenents/Sidebar/Sidebar";
import {HomeWithCalendar} from "../compenents/HomeWithCalendar/HomeWithCalendar";

export const LayoutPanel = () => {
    return (
        <main>
            <Sidebar/>
            <HomeWithCalendar/>
        </main>
    )
};