import React from 'react';
import {Route, Routes} from "react-router-dom";
import {SignUp} from "./compenents/SignUp/SignUp";
import {SignIn} from "./compenents/SignIn/SignIn";
import {CreateNewExercise} from "./compenents/CreateNewExercise/CreateNewExercise";


export const App = () => {
    return (
        <Routes>
            <Route path='/eee' element={<CreateNewExercise/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
        </Routes>

    );
}

