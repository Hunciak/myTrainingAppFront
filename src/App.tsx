import React from 'react';
import {Route, Routes} from "react-router-dom";
import {SingUp} from "./compenents/SingUp/SingUp";
import {SignIn} from "./compenents/SignIn/SingIn";


export const App = () => {
    return (
        <Routes>
            <Route path='/signup' element={<SingUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>

        </Routes>

    );
}

