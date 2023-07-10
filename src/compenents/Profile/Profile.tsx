import React, {SyntheticEvent, useState} from "react";
import {IUserSignUp} from "types";

import './Profile.css';

export const Profile = () => {
    const [form, setForm] = useState<IUserSignUp>({
        name: '',
        email: '',
        password: '',
        weight: '',
        height: '',
        gender: '',
    })
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        setIsEditing(false);
    }
    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    }
    return (
        <div className='profile'>
            <h2 className='name'>Twój Profil</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Nick:
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => updateForm('name', e.target.value)}/>
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => updateForm('email', e.target.value)}/>
                    </label>
                    <label>
                        Waga:
                        <input
                            type="text"
                            value={form.weight}
                            onChange={e => updateForm('weight', e.target.value)}/>
                    </label>
                    <label>
                        Wzrost:
                        <input
                            type="text"
                            value={form.height}
                            onChange={e => updateForm('height', e.target.value)}/>
                    </label>
                    <button type="submit">Zapisz</button>
                </form>
            ) : (
                <div>
                    <p>
                        <strong>Nazwa użytkownika:</strong> {form.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {form.email}
                    </p>
                    <p>
                        <strong>Waga:</strong> {form.weight}
                    </p>
                    <p>
                        <strong>Wzrost:</strong> {form.height}
                    </p>
                    <button onClick={() => setIsEditing(true)}>Edytuj</button>
                </div>
            )}
        </div>
    );
}

