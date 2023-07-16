import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './HomeWithCalendar.css';

const localizer = momentLocalizer(moment);

export const HomeWithCalendar = () => {
    const events = [
        {
            title: 'Wydarzenie 1',
            start: new Date(2022, 0, 1),
            end: new Date(2022, 0, 2),
        },
        {
            title: 'Wydarzenie 2',
            start: new Date(2022, 0, 3),
            end: new Date(2022, 0, 4),
        },
        {
            title: 'Wydarzenie 3',
            start: new Date(2022, 0, 5),
            end: new Date(2022, 0, 6),
        },
    ];

    return (
        <>
            <div className='container'>
                <h2>Kalendarz Treningów</h2>
                <Calendar
                    localizer={localizer} // Dodaj localizer
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: 500}}
                />
            </div>
        </>
    );
};

