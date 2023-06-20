import React from 'react';
import {Route, Routes} from "react-router-dom";
import {SignUp} from "./compenents/SignUp/SignUp";
import {SignIn} from "./compenents/SignIn/SignIn";
import {Layout} from "./Layout/Layout";


export const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
        </Routes>
    );
}

