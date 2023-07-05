import React, {useEffect, useState} from "react";

import { IExerciseName } from "types";

export const EditExercise = () => {

    const [userExerciseList, setUserExerciseList] = useState<IExerciseName[]>([]);
    const [chosenExerciseSet, setChosenExerciseSet] = useState<IExerciseName[]>([]);

    useEffect(() => {

        try {
            (async () => {
                const res = await fetch(`http://localhost:3001/user/getuserexercises`, {
                    credentials: "include",
                })
                const exercises = await res.json();
                // console.log(exercises[0].set_name)
                setUserExerciseList(exercises)
            })()
        } catch (e) {
            console.log(e)
        }

    }, []);

    useEffect(() => {
        console.log(userExerciseList)
    }, [userExerciseList]);


    const updateForm = (key: string, value: any): void => {
        setChosenExerciseSet(newExercise => ({
            ...newExercise,
            [key]: value,
        }));
    };

    return (
        <div>
                 <select placeholder="Wprowadź nazwę ćwiczenia" defaultValue={userExerciseList[0]?.name} onChange={e => updateForm('name', e.target.value)}>
                     {
                         userExerciseList.filter((exercise) => {
                             return exercise.name;
                         })
                            .map(exercise => (
                                 <option key={exercise.name} value={exercise.name}>{exercise.name}</option>
                             ))
                     }
                 </select>
        </div>
    )
}