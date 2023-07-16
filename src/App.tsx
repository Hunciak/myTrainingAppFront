import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CreateNewExercise} from "./compenents/CreateNewExercise/CreateNewExercise";
import {Layout} from "./Layout/Layout";
import {SignUp} from "./compenents/SignUp/SignUp";
import {SignIn} from "./compenents/SignIn/SignIn";
import {Contact} from "./pages/Contact/Contact";
import {Profile} from "./compenents/Profile/Profile";
import {LayoutPanel} from "./Layout/LayoutPanel";
import {Logout} from "./compenents/SignIn/Logout";




export const App = () => {
    return (
        <Routes>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/createexercise' element={<CreateNewExercise/>}/>
            <Route path='/aftersignin' element={<LayoutPanel/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/' element={<Layout/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/profil' element={<Profile/>}/>

        </Routes>
    );
}
