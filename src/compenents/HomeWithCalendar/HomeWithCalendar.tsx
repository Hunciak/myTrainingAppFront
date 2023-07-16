import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {ICalendarEvent, IExerciseName} from "types";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './HomeWithCalendar.css';
import {RedirectSignIn} from "../common/RedirectSignIn";
import {OneEventModal} from "./OneEventModal";



const localizer = momentLocalizer(moment);

export const HomeWithCalendar = () => {
    const events = [
        {
            title: 'Wydarzenie 1',
            start: new Date(2022, 6, 14),
            end: new Date(2022, 6, 14),
        }
    ];
    const [newEvent, setNewEvent] = useState<ICalendarEvent>({
        title: '',
        start: new Date(),
        end: new Date(),
    });
    const [eventAgenda, setEventAgenda] = useState<ICalendarEvent[]>()
    const [allEvents, setAllEvents] = useState<IExerciseName[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<ICalendarEvent>();
    const [toggleModal, setToggleModal] = useState<boolean>(false);



    useEffect(() => {
            try {
                (async () => {
                    const res = await fetch(`http://localhost:3001/calendar/getevents`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: "include",
                    });
                    RedirectSignIn(res.status);
                    const events = await res.json();
                    setAllEvents(events);
                    setNewEvent(newEvent => ({
                        ...newEvent,
                        title: events[0].set_name,
                    }));
                    await getData();
                })();
            } catch (e) {
                console.log(e);
            }
    }, []);

    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:3001/calendar/getagenda`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });
            RedirectSignIn(res.status);
            if (res.status === 204) {
                return setEventAgenda(events)
            }
            const agenda = await res.json();
            setEventAgenda(agenda)
        } catch (e) {
            console.log(e)
        }
    }

    const updateForm = (key: string, value: any): void => {
        setNewEvent(newEvent => ({
            ...newEvent,
            [key]: value,
        }));
    };

    useEffect(() => {
        // updateForm('end', newEvent.start);
    }, [newEvent.start]);


    const selectExercise =
        <select placeholder="Wprowadź nazwę ćwiczenia" defaultValue={allEvents[0]?.set_name} onChange={e => updateForm('title', e.target.value)}>
            {
                allEvents.filter((event) => {
                    return event.set_name;
                })
                    .map((exercise) => (
                        <option className='option-exer' key={exercise.set_name} value={exercise.set_name}>{exercise.set_name}</option>
                    ))
            }
        </select>

    const chooseData =
        <DatePicker
            selected={newEvent.start}
            onChange={(date) => updateForm('start', date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a date"
        />

    const handleSave = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/calendar/saveevent', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                credentials: "include",
                body: JSON.stringify(newEvent),
            });
            if (res.status === 204) {
                setEventAgenda(events)
            }
            const schedule = await res.json()
            setEventAgenda(schedule)

        } catch (e) {
            console.log(e)
            alert('Wystąpił błąd, spróbuj ponownie później.');
        }
    };

    const handleSelectEvent = async (event: ICalendarEvent) => {
        setSelectedEvent(event)
        setToggleModal(!toggleModal)
    };

    const handleCloseModal = () => {
        setToggleModal(false); // Aktualizacja wartości toggleModal w rodzicu
    };

    return (
        <>
            <div className='container'>
                <div >
                    <h2>Kalendarz Treningów</h2>
                    {selectExercise}
                    {chooseData}
                    <button onClick={handleSave}>Zapisz</button>
                </div>

                <Calendar
                    localizer={localizer}
                    events={eventAgenda}
                    startAccessor="start"
                    endAccessor="start"
                    style={{height: 500}}
                    onSelectEvent={handleSelectEvent}
                />
                {toggleModal ? (<OneEventModal props={selectedEvent} onClose={handleCloseModal}/>) : null}
            </div>
        </>
    );
};

