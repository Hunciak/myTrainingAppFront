import React, {SyntheticEvent, useState} from "react";
import {IUserLogIn} from "types";
import {Btn} from "../common/Btn";
import './SignIn.css';
import {Link, NavLink} from "react-router-dom";


export const SignIn = () => {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<IUserLogIn>({
            name: '',
            password: '',
        }
    );

    const [status, setStatus] = useState({
        success: false,
        wrongData: false,
        unknownError: false,
    })

    const signIn = async (e: SyntheticEvent) => {
        e.preventDefault();
        // setLoading(true);
        try {

            const res = await fetch(`http://localhost:3001/signin`, {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (res.status === 200) {
                setStatus(status => ({
                    ...status,
                    success: true,
                    wrongData: false,
                    unknownError: false,
                }));
            } else if (res.status === 401) {
                setStatus(status => ({
                    ...status,
                    success: false,
                    wrongData: true,
                    unknownError: false,
                }));
            } else {
                setStatus(status => ({
                    ...status,
                    success: false,
                    wrongData: false,
                    unknownError: true,
                }));
            }

        } catch (error) {
            console.log('Błąd podczas logowania', error)
        } finally {
            setLoading(false);
        }
    };

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    if (loading) {
        return <div>Trwa logowanie. </div>
    }

    if (status.success) {
        return (
            <div>
                <h2>Pomyślnie zalogowano.</h2>
                <NavLink to="/eee">Idź do profilu</NavLink>
            </div>
        )
    }

    return (
        <div className='login'>
            <form className='sign-in' onSubmit={signIn}>
                <h1>Zaloguj się</h1>
                <input type="text"
                       placeholder='Nazwa użytkownika'
                       name="name"
                       required
                       value={form.name}
                       onChange={e => updateForm('name', e.target.value)}/>
                <input type="password"
                       placeholder='Hasło'
                       name="password"
                       required
                       value={form.password}
                       onChange={e => updateForm('password', e.target.value)}/>
                {status.wrongData? (<p>Błędny email lub hasło.</p>) : (<p/>)}
                <span>Nie masz konta? Kliknij tutaj <Link to='/signup'>Rejstracja</Link></span>
                <Btn text={'SignIn'}/>
            </form>
        </div>
    )
}