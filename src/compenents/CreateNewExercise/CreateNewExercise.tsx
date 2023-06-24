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

    const [addCustomFlag, setAddCustomFlag] = useState<boolean>(true)

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

    const customFlag = (e: SyntheticEvent) => {
        e.preventDefault();
        setAddCustomFlag(!addCustomFlag)
    }
    const inputExercise =
        <input type="text"
               placeholder='Nazwa ćwiczenia'
               name="name"
               required
               value={newExercise.name}
               onChange={e => updateForm('name', e.target.value)}/>

    const addExercise = (e:React.FormEvent):any => {
        e.preventDefault()
        //dodanie nowego ćwiczenia do listy
        const nextExercise = React.createElement(
            'li',
            { key:newExercise.name, id:"to" },
            "cos", //dodac strukture listy
        ) as any;
        const delButton = React.createElement(
                'button',
                { key:newExercise.name, onClick: () => deleteExercise(newExercise.name)  },
                'usuń'
            ) as any

        console.log('chce dodac ale nie umiem', nextExercise.props.children)
        document.body.append(nextExercise.props.children, delButton.props.children)
        

    }
//@todo dodawanie cwiczen do listy, wysylanie listy cwiczen do be
    const deleteExercise = (key: string): void => {
        const newExerciseList = choosenExercises.filter((nextExercise)=> nextExercise.name !== key)
        setChoosenExercises(newExerciseList)
        console.log('nowa lista zajec po usunieciu', choosenExercises);
        
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
            <Btn text={'Dodaj ćwiczenie do listy'}/>
            <ul id="to" ></ul>
        </form>

    </div>
)
}