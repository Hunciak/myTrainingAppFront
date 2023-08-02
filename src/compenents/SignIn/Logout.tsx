// import {RedirectHome} from "../common/RedirectSignIn";
// import React, {useEffect} from "react";
//
// export const Logout = async () => {
//
//     useEffect(() => {
//         const logout = async () => {
//         try {
//             await fetch("http://localhost:3001/signin/logout", {
//                 method: "PUT",
//                 credentials: "include",
//             });
//             RedirectHome();
//         } catch (error) {
//             throw error;
//             }
//         };
//         logout()
//     }, []);
//
//
//     return (
//         <div>
//             <p>
//                 Trwa wylogowywanie...
//             </p>
//         </div>
//     )
// };

import React, { useEffect } from 'react';
import { RedirectHome } from '../common/RedirectSignIn';

export const Logout = () => {
    useEffect(() => {
        const logout = async () => {
            try {
                await fetch('http://localhost:3001/signin/logout', {
                    method: 'PUT',
                    credentials: 'include',
                });
                RedirectHome();
            } catch (error) {
                throw error;
            }
        };
        logout();
    }, []);

    return (
        <div>
            <p>Trwa wylogowywanie...</p>
        </div>
    );
};
