import React, {SyntheticEvent, useEffect, useState} from "react";
import {IUserData} from "types";
import './Profile.css';
import {Sidebar} from "../Sidebar/Sidebar";

export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [dataUser, setDataUser] = useState<IUserData[]>([]);
    useEffect(() => {
        try {
            (async () => {
                const res = await fetch(`http://localhost:3001/profil`, {
                    credentials: "include",
                });
                const data = await res.json();
                setDataUser(data);
            })();
        } catch (e) {
            console.log('Błąd', e);
        }
    }, [])

    const updateForm = (key: string, value: any): void => {
        setDataUser(prevData => {
            const updatedUser = {...prevData[0], [key]: value};
            return [updatedUser];
        });
    };
    const updateUserData = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:3001/profil/updatedata', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataUser),
            });

        } catch (e) {
            console.log('Błąd', e);
        }
    }
    return (
        <>
            <Sidebar/>
            <div className='profile'>
                <h2 className='name'>Twój Profil</h2>
                {isEditing ? (
                    <div>
                        <form onSubmit={updateUserData}>
                            <label>
                                Imię:
                                <input
                                    type="text"
                                    name='name'
                                    value={dataUser[0].name}
                                    onChange={e => updateForm('name', e.target.value)}/>
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name='email'
                                    value={dataUser[0].email}
                                    onChange={e => updateForm('email', e.target.value)}/>
                            </label>
                            <label>
                                Waga:
                                <input
                                    type="text"
                                    name='weight'
                                    value={dataUser[0].weight}
                                    onChange={e => updateForm('weight', e.target.value)}/>
                            </label>
                            <label>
                                Wzrost:
                                <input
                                    type="text"
                                    name='height'
                                    value={dataUser[0].height}
                                    onChange={e => updateForm('height', e.target.value)}/>
                            </label>
                            <button type="submit">Zapisz</button>
                        </form>
                    </div>

                ) : (
                    <div>
                        <p>
                            <strong>Imię:</strong> {dataUser[0]?.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {dataUser[0]?.email}
                        </p>
                        <p>
                            <strong>Waga:</strong> {dataUser[0]?.weight}
                        </p>
                        <p>
                            <strong>Wzrost:</strong> {dataUser[0]?.height}
                        </p>
                        <button onClick={() => setIsEditing(true)}>Edytuj</button>
                    </div>
                )}
            </div>
        </>
    );
};
