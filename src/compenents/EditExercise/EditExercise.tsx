import React, {SyntheticEvent, useEffect, useState} from "react";

import {ICreateNewExercise, IExerciseName } from "types";
import {RedirectSignIn} from "../common/RedirectSignIn";
import {Btn} from "../common/Btn";
import './EditExercise.css';

export const EditExercise = () => {

    const [userExerciseList, setUserExerciseList] = useState<IExerciseName[]>([]);

    const [chosenExerciseSet, setChosenExerciseSet] = useState<IExerciseName>();

    const [sets, setSets] = useState<ICreateNewExercise[]>([]);

    const [noContent, setNoContent] = useState<Number>(200);

    const [editExercise, setEditExercise] = useState<boolean>(false)

    useEffect(() => {
        try {
            (async () => {
                const res = await fetch(`http://localhost:3001/user/getuserexercises`, {
                    credentials: "include",
                })
                RedirectSignIn(res.status);

                if (res.status === 204) {
                    return setNoContent(204)
                }
                const exercises = await res.json();

                setChosenExerciseSet(exercises[0])
                setUserExerciseList(exercises)

            })()
        } catch (e:any) {
            console.log(e.status)
        }

    }, []);


    useEffect(() => {
        if (chosenExerciseSet !== undefined){
        try {
            (async () => {
                const res = await fetch(`http://localhost:3001/user/getuserexercisesdetails?value=${chosenExerciseSet.set_name}`, {
                    credentials: "include",
                })
                RedirectSignIn(res.status);
                if (res.status === 204) {

                    return setNoContent(204)
                }
                const userSets = await res.json();
                setSets(userSets)
                setNoContent(200)
            })()
        } catch (e:any) {
            console.log(e.status)
        }
        }

    }, [chosenExerciseSet]);

    const sendForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3001/user/updateexercise`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(sets),
            })
        } catch (e) {
            console.log(e)
        }
    }

    const selectExercise =
        <select placeholder="Wprowadź nazwę ćwiczenia" defaultValue={userExerciseList[0]?.name} onChange={e => updateForm('set_name', e.target.value)}>
            {
                userExerciseList.filter((exercise) => {
                    return exercise.set_name;
                })
                    .map((exercise) => (
                        <option className='option-exer' key={exercise.set_name} value={exercise.set_name}>{exercise.set_name}</option>
                    ))
            }
        </select>

    const viewUserExercises = sets.length > 0 ? (
                sets.map((exercise) => (
                    <li className='view-user-exer' key={exercise.name}>
                        <p><strong>Nazwa ćwiczenia:</strong> {exercise.name} </p>
                        <p><strong>Liczba serii:</strong> {exercise.series}</p>
                        <p><strong>Liczba powtórzeń:</strong> {exercise.repeats}</p>
                        <p><strong>Obciążenie:</strong> {exercise.weight}</p>
                        <p><strong>Czas treningu:</strong> {exercise.time}</p>
                    </li>
                ))
    ): null;
    const editUserExercises = sets.length > 0 ? (
        sets.map((exercise, index) => (
            <li className='edit-user-exer' key={exercise.name}>
                <p>Nazwa ćwiczenia: </p>
                <input placeholder="" value={exercise.name} onChange={e => updateExerciseState('name', e.target.value, index)} />
                <p>Liczba serii: </p>
                <input placeholder="" value={exercise.series} onChange={e => updateExerciseState('series', e.target.value, index)}/>
                <p>Liczba powtórzeń:  </p>
                <input placeholder="" value={exercise.repeats} onChange={e => updateExerciseState('repeats', e.target.value, index)}/>
                <p>Obciążenie: </p>
                <input placeholder="" value={exercise.weight} onChange={e => updateExerciseState('weight', e.target.value, index)}/>
                <p>Czas treningu: </p>
                <input placeholder="" value={exercise.time} onChange={e => updateExerciseState('time', e.target.value, index)}/>
            </li>
        ))
    ): null;

    const editExerciseForm = () => {
        return (
            <form onSubmit={sendForm}>
                {viewUserExercises}
                {editUserExercises}
                <Btn text="Zapisz zmiany"/>
                <button onClick={() => setEditExercise(false)}>Wróć</button>
            </form>)
    }

    const updateExerciseState = (key: string, value: any, index: number): void => {
        setSets(prevSets => {
            const updatedSets = [...prevSets];
            const objectToUpdate = updatedSets[index];
            const updatedObject = { ...objectToUpdate, [key]: value };
            updatedSets[index] = updatedObject;
            return updatedSets;
        });
    };

    const updateForm = (key: string, value: any): void => {
        setChosenExerciseSet((newExercise:any) => ({
            ...newExercise,
            [key]: value,
        }));
    };

    return (
        <div className='edit-exer'>
            {noContent === 204 ? <p>Nie ma co wyświetlić</p> : (noContent === 200 ? <div><p>Wybierz zestaw ćwiczeń</p> {selectExercise}</div> : <p>Nieznany błąd</p>)}
            {noContent === 204 ? null : <ul>{viewUserExercises}</ul>}
            {editExercise ? editExerciseForm() : <button onClick={() => setEditExercise(true)}>Edytuj</button>}
        </div>
    )
}