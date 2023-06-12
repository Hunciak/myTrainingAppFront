import {useState, SyntheticEvent} from "react";
import {IUserSingUp} from "types";
import {Btn} from "../common/Btn";
import './SingUp.css';


export const SingUp = () => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<IUserSingUp>({
        name: '',
        email: '',
        password: '',
        weight: 0,
        height: 0,
        gender: '',
    });
    // const [repPass, setRepPass] = useState({
    //     validPass: '',
    // });

    const saveUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        const wrapForm = {
            name: form.name,
            email: form.email,
            password: form.password,
            weight: form.weight,
            height: form.weight,
            gender: form.gender,
        }
        try {
            console.log("wrap przed wyslaniem", form, wrapForm)
            const res = await fetch(`http://localhost:3001/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
            })
            const data = await res.json();
            console.log(data);

        } catch (e) {
            console.log('Błąd...', e);
        } finally {
            setLoading(false);
        }
    }
    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }
    if (loading) {
        return <p>Trwa rejstracja</p>
    }
    if (id) {
        return <p>Pomyślnie zalogowano</p>
    }

    return (
        <div className='registration'>
            <form className='sing-up' onSubmit={saveUser}>
                <h1>Rejstracja</h1>
                <input type="text"
                       placeholder='Nazwa użytkownika'
                       value={form.name}
                       onChange={e => updateForm('name', e.target.value)}/>
                <input type="email"
                       placeholder='email'
                       value={form.email}
                       onChange={e => updateForm('email', e.target.value)}
                />
                <input type="password"
                       placeholder='Hasło'
                       value={form.password}
                       maxLength={30}
                       onChange={e => updateForm('password', e.target.value)}
                />
                <input type="number"
                       placeholder='Aktualna waga'
                       value={form.weight}
                       maxLength={3}
                       onChange={e => updateForm('weight', e.target.value)}
                />
                <input type="number"
                       placeholder='Wzrost'
                       value={form.height}
                       maxLength={3}
                       onChange={e => updateForm('height', e.target.value)}
                />
                <input
                    className='gender'
                    type="radio"
                    name='gender'
                    value="male"
                    onChange={e => updateForm('gender', e.target.value)}
                />Mężczyzna
                <input
                    className='gender'
                    type="radio"
                    name='gender'
                    value='female'
                    onChange={e => updateForm('gender', e.target.value)}
                />Kobieta
                <Btn text={'Zarejestruj'}/>
            </form>

        </div>
    )
};