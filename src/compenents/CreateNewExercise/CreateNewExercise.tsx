import React, {SyntheticEvent, useEffect, useState} from "react";
import {ICreateNewExercise, IExerciseName} from "types";
import {Btn} from "../common/Btn";

export const CreateNewExercise = () => {

    const [choosenExercises, setChoosenExercises] = useState<ICreateNewExercise[]>([]);

    const [newExercise, setNewExercise] = useState<ICreateNewExercise>({
        setName: '',
        name: '',
        series: 0,
        repeats: 0,
        weight: 0,
        time: 0,
        });

    const [exerciseList, setExerciseList] = useState<IExerciseName[]>([]);

    const [addCustomFlag, setAddCustomFlag] = useState<boolean>(true)

    const [status, setStatus] = useState('')

    useEffect(() => {

        try {
            (async() => {
                const res = await fetch(`http://localhost:3001/user/getexercises`, {
                    credentials: "include",
                })
                const exercises = await res.json();
                console.log("odp z be:",exercises)
                setExerciseList(exercises)
            })()
        } catch (error) {
            console.log('Błąd podczas pobierania nazw ćwiczeń', error)
        }
    }, [])

    useEffect(() => {
       setChoosenExercises([])
    }, [status]);

    const customFlag = (e: SyntheticEvent) => {
        e.preventDefault();
        setAddCustomFlag(!addCustomFlag)
    }

    const selectExercise =
        <select placeholder="Wprowadź nazwę ćwiczenia" defaultValue={exerciseList[0].name} onChange={e => updateForm('name', e.target.value)}>
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
        e.preventDefault()
        setChoosenExercises([...choosenExercises, newExercise]);
        console.log(choosenExercises)
    }

    const deleteExercise = (key: string): void => {
        const newExerciseList = choosenExercises.filter((nextExercise)=> nextExercise.name !== key)
        setChoosenExercises(newExerciseList)
    }

    const updateForm = (key: string, value: any): void => {
        setNewExercise(newExercise => ({
            ...newExercise,
            [key]: value,
        }));
    };

    const sendExercise = (e: SyntheticEvent) => {
        e.preventDefault();

        choosenExercises.forEach(async (exercise) => {
            try {
                console.log("wrap przed wyslaniem", JSON.stringify(exercise))
                const res = await fetch(`http://localhost:3001/user/saveexer`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify(exercise),
                })
                if (res.status === 200) {
                    setStatus('Pomyślnie dodano zestaw ćwiczeń');
                } else {
                    setStatus('Wystąpił błąd, spróbuj później.')
                    console.log('Error: Response Status', res.status);
                }
            } catch (e) {
                console.log('Błąd...', e);
            }
        })
    }

    return (
        <div className='login'>
        <form className='sign-in' onSubmit={addExercise}>
            <h1>Stwórz swój plan treningowy</h1>
            {!addCustomFlag? inputExercise: selectExercise}
            <h1 onClick={customFlag}><Btn  text="Stwórz własne ćwiczenie"/></h1>
            <input type="number"
                   placeholder='Liczba serii'
                   name="series"
                   required
                   value={newExercise.series}
                   onChange={e => updateForm('series', e.target.value)}
            />
            <input type="number"
                   placeholder='Liczba powtórzeń'
                   name="repeats"
                   value={newExercise.repeats}
                   onChange={e => updateForm('repeats', e.target.value)}
            />
            <input type="number"
                   placeholder='Obciążenie'
                   name="weight"
                   value={newExercise.weight}
                   onChange={e => updateForm('weight', e.target.value)}
            />
            <input type="number"
                   placeholder='Czas treningu'
                   name="time"
                   value={newExercise.time}
                   onChange={e => updateForm('time', e.target.value)}
            />
            <Btn text={'Dodaj ćwiczenie do listy'}/>

        </form>
            <input type="text"
                   placeholder='Wprowadź nazwę zestawu ćwiczeń'
                   name="setName"
                   value={newExercise.setName}
                   onChange={e => updateForm('setName', e.target.value)}
            />
            <form className='sign-in' onSubmit={sendExercise}>
                <ul >
                    <h1>Twoja lista ćwiczeń: </h1>
                    {status ? (<p>{status}</p>) : (<p>{status}</p>)}
                    {choosenExercises.length > 0 ? (
                        choosenExercises.map((exercise, index) => (
                            <li key={exercise.name}>
                                <p>Nazwa ćwiczenia: {exercise.name} <button onClick={() => deleteExercise(exercise.name)}>Usuń</button></p>
                                <p>Liczba serii: {exercise.series}</p>
                                <p>Liczba powtórzeń: {exercise.repeats}</p>
                                <p>Obciążenie: {exercise.weight}</p>
                                <p>Czas treningu: {exercise.time}</p>
                            </li>
                        ))
                    ) : ( !status? (
                        <p>Nie dodano żadnego ćwiczenia.</p>
                    ) : (<p></p>)
                    )}
                </ul>
                <Btn text='Zapisz ćwiczenie'/>
            </form>
    </div>
)
}