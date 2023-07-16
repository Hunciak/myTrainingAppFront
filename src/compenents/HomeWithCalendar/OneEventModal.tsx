import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { ICreateNewExercise } from 'types';
import {RedirectSignIn} from "../common/RedirectSignIn";
import './OneEventModal.css'

interface Props {
    title: string,
}

export const OneEventModal = (props: any) => {
    const [toggleModal, setToggleModal] = useState(true);

    const [set, setSet] = useState<ICreateNewExercise[]>([]);

    useEffect(() => {
        try {
            (async () => {
                const res = await fetch(`http://localhost:3001/user/getuserexercisesdetails?value=${props.props.title}`, {
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                RedirectSignIn(res.status);
                const userSet = await res.json();
                setSet(userSet)
            })()
        }catch (e) {
            console.log(e)
        }
    }, []);

    const handleDelete = async () => {
        try {
                const res = await fetch(`http://localhost:3001/calendar/deleteevent?value=${props.props.id_title}`, {
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                RedirectSignIn(res.status);
                console.log(res.status)

                setToggleModal(false)
        } catch (e) {
            console.log(e)
        }
    };

    const eventDetails = <>
        <button onClick={handleDelete}>Usuń</button>
        {set ? (  set.map((exercise) => (
            <li className='edit-user-exer' key={exercise.name}>
                    <p>Nazwa ćwiczenia: {exercise.name}</p>
                    <p>Liczba serii: {exercise.series}</p>
                    <p>Liczba powtórzeń: {exercise.repeats}</p>
                    <p>Obciążenie: {exercise.weight}</p>
                    <p>Czas treningu: {exercise.time}</p>
                </li>
        ))) : null}
    </>
    return (
        <>
            <Modal
                size="lg"
                show={toggleModal}
                onHide={() => setToggleModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {props.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {eventDetails}
                </Modal.Body>

            </Modal>
        </>
    );
};