import React, {SyntheticEvent, useEffect, useState} from "react";
import {ICreateNewExercise, IExerciseName} from "types";
import {Btn} from "../common/Btn";




export const CreateNewExercise = () => {

    const [choosenExercises, setChoosenExercises] = useState<ICreateNewExercise[]>([{
        name: '',
        series: 0,
        repeats: 0,
        time: 0,
    }]);

    const [newExercise, setNewExercise] = useState<ICreateNewExercise>({
        name: '',
        series: 0,
        repeats: 0,
        time: 0,
        });

    const [exerciseList, setExerciseList] = useState<IExerciseName[]>([{
        name: '',
    }]);

    const [addCustomFlag, setAddCustomFlag] = useState<boolean>(false)

    useEffect(() => {

        try {
            (async() => {
                const res = await fetch(`http://localhost:3001/user/getexercises`)
                const exercises = await res.json();
                console.log('pobrane nazwy ćwiczeń',exercises)
                setExerciseList(exercises)
            })()
        } catch (error) {
            console.log('Błąd podczas pobierania nazw ćwiczeń', error)
        }
    }, [])

    const selectExercise = () => {
        return (
            <select name="" id="exercise" value="name" onChange={e => updateForm('name', e.target.value)}>
                {
                    exerciseList.filter((exercise) => {
                        return exercise.name === 'name';
                    })
                        .map(exercise => (
                            <option key={exercise.name} value={exercise.name}>{exercise.name}</option>
                        ))
                }
            </select>
        )
    }

    const addExercise = () => {
        //dodanie nowego ćwiczenia do listy
    }


    const updateForm = (key: string, value: any) => {
        setNewExercise(newExercise => ({
            ...newExercise,
            [key]: value,
        }));
    };

    return (
        <div className='login'>
        <form className='sign-in' onSubmit={addExercise}>
            <h1>Stwórz swój plan treningowy</h1>
            <input type="text"
                   placeholder='Nazwa ćwiczenia'
                   name="name"
                   required
                   value={newExercise.name}
                   onChange={e => updateForm('name', e.target.value)}/>
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
                   required
                   value={newExercise.repeats}
                   onChange={e => updateForm('repeats', e.target.value)}
            />
            <input type="number"
                   placeholder='Czas treningu'
                   name="time"
                   required
                   value={newExercise.time}
                   onChange={e => updateForm('time', e.target.value)}
            />
            <Btn text={'Dodaj'}/>
        </form>
    </div>
)
}