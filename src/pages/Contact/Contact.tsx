import React from 'react';
import './Contact.css';
import {Navbar} from "../../compenents/Navbar/Navbar";

export const Contact = () => {
    return (
        <>
            <Navbar/>
            <div className="contact-page-container">
                <div className="contact-content">
                    <h1 className="contact-title">Kontakt</h1>
                    <p className="contact-info">Jeśli masz jakieś pytania prosimy o kontakt z nami. </p>
                    <p className="contact-info">Telefon: +123456789</p>
                    <p className="contact-info">Email: example@example.com</p>
                    <p className="contact-info">Adres: 123 Main Street, City, Country</p>
                </div>
            </div>
        </>
    );
};
