import React from 'react';
import {Route, Routes} from "react-router-dom";
import {SingUp} from "./compenents/SingUp/SingUp";


export const App = () => {
    return (
        <Routes>
            <Route path='/singup' element={<SingUp/>}/>

        </Routes>

    );
}

