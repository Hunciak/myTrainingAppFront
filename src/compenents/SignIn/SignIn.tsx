import React, {SyntheticEvent, useState} from "react";
import {IUserLogIn} from "types";
import {Btn} from "../common/Btn";
import './SignIn.css';
import {Link, useNavigate} from "react-router-dom";


export const SignIn = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState<IUserLogIn>({
            name: '',
            password: '',
        }
    );
    const [err, setErr] = useState('');

    const signIn = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('doszedlem do signIn form', form)
            const res = await fetch(`http://localhost:3001/signin`, {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (res.status === 200) {
                return (
                    navigate('/aftersignin')
                )
            } else if (res.status === 401) {
                setErr('Email lub hasło jest nieprawidłowe.')
                return;
            }

            console.log("res z be z tokenem", res)
            const getId = await res.json();
            setId(getId.signIn);

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
    // if(loading){
    //     navigate('/aftersignin');
    // }
    // if (id) {
    //     return (
    //         <div>
    //             <h2>Zalogowano</h2>
    //         </div>
    //     )
    // }

    return (
        <div className='login'>
            <form className='sign-in' onSubmit={signIn}>
                <h1>Zaloguj się</h1>
                <input type="text"
                       placeholder='email'
                       name="name"
                       required
                       value={form.name}
                       onChange={e => updateForm('name', e.target.value)}/>
                <input type="password"
                       placeholder='Hasło'
                       name="password"
                       required
                       value={form.password}
                       onChange={e => updateForm('password', e.target.value)}
                />
                {err && <div className='error'>{err}</div>}
                <span>Nie masz konta? Kliknij tutaj <Link to='/signup'>Rejstracja</Link></span>
                <Btn text={'Zaloguj się'}/>
            </form>
        </div>
    )
}