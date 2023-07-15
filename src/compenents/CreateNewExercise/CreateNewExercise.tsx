import React, {SyntheticEvent, useEffect, useState} from "react";
import {ICreateNewExercise, IExerciseName} from "types";
import {Btn} from "../common/Btn";
import {RedirectSignIn} from "../common/RedirectSignIn";
import './CreateNewExercise.css';
import {EditExercise} from "../EditExercise/EditExercise";

export const CreateNewExercise = () => {

    const [chosenExercises, setChosenExercises] = useState<ICreateNewExercise[]>([]);

    const [newExercise, setNewExercise] = useState<ICreateNewExercise>({
        name: '',
        series: 0,
        repeats: 0,
        weight: 0,
        time: 0,
        });

    const [groupName, setGroupName] = useState<IExerciseName>({
        name: '',
    });

    const [exerciseList, setExerciseList] = useState<IExerciseName[]>([]);

    const [addCustomFlag, setAddCustomFlag] = useState<boolean>(true);

    const [status, setStatus] = useState('');

    const [nameCheck, setNameCheck] = useState("");

    useEffect(() => {

        try {
            (async() => {
                const res = await fetch(`http://localhost:3001/user/getexercises`, {
                    credentials: "include",
                })
                RedirectSignIn(res.status);

                const exercises = await res.json();
                setExerciseList(exercises);
                setNewExercise(exercise => ({
                    ...exercise,
                    name: exercises[0].name,
                }));

            })()
        } catch (error) {
            console.log('Błąd podczas pobierania nazw ćwiczeń', error)
        }
    }, [])

    const customFlag = (e: SyntheticEvent) => {
        e.preventDefault();
        setAddCustomFlag(!addCustomFlag)
    }

    const selectExercise =
        <select placeholder="Wprowadź nazwę ćwiczenia" defaultValue={exerciseList[0]?.name} onChange={e => updateForm('name', e.target.value)}>
            {
                exerciseList.filter((exercise) => {
                    return exercise.name;
                })
                    .map(exercise => (
                        <option key={exercise.name} value={exercise.name}>{exercise.name}</option>
                    ))
            }
        </select>

    const inputExercise =
        <input type="text"
               placeholder='Nazwa ćwiczenia'
               name="name"
               required
               value={newExercise.name}
               onChange={e => updateForm('name', e.target.value)}/>

    const addExercise = (e:React.FormEvent): void => {
        e.preventDefault();
        let nameCheck = '';
        for (const element of chosenExercises) {
            if (element.name === newExercise.name) {
                nameCheck = newExercise.name
            }
        }
        if (nameCheck){
            return setNameCheck(nameCheck);
        }
        setChosenExercises([...chosenExercises, newExercise]);
    }

    const deleteExercise = (key: string): void => {
        const newExerciseList = chosenExercises.filter((nextExercise)=> nextExercise.name !== key)
        setChosenExercises(newExerciseList)
    }

    const updateForm = (key: string, value: any): void => {
        setNewExercise(newExercise => ({
            ...newExercise,
            [key]: value,
        }));
    };
    const updateGroup = (key: string, value: any): void => {
        setGroupName(groupName => ({
            ...groupName,
            [key]: value,
        }));
    }

    const sendExercise = async (e: SyntheticEvent) => {
        e.preventDefault();

        const updatedExercises = chosenExercises.map((exercise) => ({
            ...exercise,
            set_name: groupName.name,
        }));

            try {
                const res = await fetch(`http://localhost:3001/user/saveexercises`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify(updatedExercises),
                })

                // RedirectSignIn(res.status);
                if (res.status === 200) {
                    setStatus('Pomyślnie dodano zestaw ćwiczeń');
                    setChosenExercises([])
                }
            } catch (e:any) {
                setStatus(`${e.message}`)
            }
    }

    return (
        <div className='create-exer' >
        <form className='create-exer-form' onSubmit={addExercise}>
            <h1>Stwórz swój plan treningowy</h1>
            {!addCustomFlag? inputExercise: selectExercise}
            <h1 onClick={customFlag}><Btn  text="Stwórz własne ćwiczenie"/></h1>
            <p>Liczba serii: </p>
            <input type="number"
                   placeholder=''
                   name="series"
                   required
                   value={newExercise.series}
                   onChange={e => updateForm('series', e.target.value)}
            />
            <p>Liczba powtórzeń: </p>
            <input type="number"
                   placeholder=''
                   name="repeats"
                   value={newExercise.repeats}
                   onChange={e => updateForm('repeats', e.target.value)}
            />
            <p>Obciążenie: </p>
            <input type="number"
                   placeholder=''
                   name="weight"
                   value={newExercise.weight}
                   onChange={e => updateForm('weight', e.target.value)}
            />
            <p>Czas treningu: </p>
            <input type="number"
                   placeholder=''
                   name="time"
                   value={newExercise.time}
                   onChange={e => updateForm('time', e.target.value)}
            />
            {newExercise.name === nameCheck ? <p>W danym zestawie ćwiczeń już istnieje ćwiczenie o nazwie {nameCheck}</p> : null}
            <Btn text={'Dodaj ćwiczenie do listy'}/>

        </form>
            <input type="text"
                   placeholder='Wprowadź nazwę zestawu ćwiczeń'
                   name="name"
                   // value={groupName.name}
                   onChange={e => updateGroup('name', e.target.value)}
            />
            <form className='create-exer-form' onSubmit={sendExercise}>
                <ul >
                    <h1>Twoja lista ćwiczeń: </h1>
                    {status ? (<p>{status}</p>) : (<p>{status}</p>)}
                    {chosenExercises.length > 0 ? (
                        chosenExercises.map((exercise, index) => (
                            <li className='exer-li' key={exercise.name}>
                                <p>Nazwa ćwiczenia: {exercise.name} <button className='del-exer-button' onClick={() => deleteExercise(exercise.name)}>Usuń</button></p>
                                <p>Liczba serii: {exercise.series}</p>
                                <p>Liczba powtórzeń: {exercise.repeats}</p>
                                <p>Obciążenie: {exercise.weight}</p>
                                <p>Czas treningu: {exercise.time}</p>
                            </li>
                        ))
                    ) : ( !status? (
                        <p>Nie dodano żadnego ćwiczenia.</p>
                    ) : null
                    )}
                </ul>
                <Btn text="Wyślij"/>
            </form>
            <EditExercise/>
    </div>
)
}