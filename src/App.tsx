import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CreateNewExercise} from "./compenents/CreateNewExercise/CreateNewExercise";
import {Layout} from "./Layout/Layout";
import {SignUp} from "./compenents/SignUp/SignUp";
import {SignIn} from "./compenents/SignIn/SignIn";
import {Contact} from "./pages/Contact/Contact";
import {Profile} from "./compenents/Profile/Profile";
import {LayoutPanel} from "./Layout/LayoutPanel";


export const App = () => {
    return (
        <Routes>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/eee' element={<CreateNewExercise/>}/>
            <Route path='/aftersignin' element={<LayoutPanel/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/' element={<Layout/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/profil' element={<Profile/>}/>

        </Routes>
    );
}
