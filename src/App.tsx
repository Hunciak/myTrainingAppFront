import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CreateNewExercise} from "./compenents/CreateNewExercise/CreateNewExercise";
import {Layout} from "./Layout/Layout";
import {Products} from "./pages/Products/Products";
import {About} from "./pages/About/About";
import {Sidebar} from "./compenents/Sidebar/Sidebar";
import {SignUp} from "./compenents/SignUp/SignUp";
import {SignIn} from "./compenents/SignIn/SignIn";



export const App = () => {
    return (
        <Routes>
            <Route path='/eee' element={<CreateNewExercise/>}/>
            <Route path='/aftersignin' element={<Sidebar/>}/>
            <Route path='/' element={<Layout/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/products' element={<Products/>}/>
        </Routes>
    );
}
