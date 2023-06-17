import {useState, SyntheticEvent} from "react";
import {IUserSignUp} from "types";
import {Btn} from "../common/Btn";
import './SignUp.css';
import {Link} from "react-router-dom";


export const SignUp = () => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<IUserSignUp>({
        name: '',
        email: '',
        password: '',
        weight: 0,
        height: 0,
        gender: '',
    });
    const [checkPassword, setCheckPassword] = useState({
        validPassword: '',
    });

    const saveUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            console.log("wrap przed wyslaniem", JSON.stringify(form))
            const res = await fetch(`http://localhost:3001/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
            })
            const data = await res.json();
            console.log(data);
            if (!checkPassword || checkPassword.validPassword !== form.password) {
                alert('Podane hasła nie są takie same.');
            }

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
        setCheckPassword(form => ({
            ...form,
            [key]: value
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
            <form className='sign-up' onSubmit={saveUser}>
                <h1>Rejstracja</h1>
                <input type="text"
                       placeholder='Nazwa użytkownika'
                       value={form.name}
                       maxLength={30}
                       required
                       onChange={e => updateForm('name', e.target.value)}/>
                <input type="email"
                       placeholder='email'
                       value={form.email}
                       required
                       onChange={e => updateForm('email', e.target.value)}
                />
                <input type="password"
                       placeholder='Hasło'
                       value={form.password}
                       maxLength={30}
                       required
                       onChange={e => updateForm('password', e.target.value)}
                />
                <input type="password"
                       placeholder='Powtórz hasło'
                       value={checkPassword.validPassword}
                       maxLength={30}
                       required
                       onChange={e => updateForm('validPassword', e.target.value)}
                />
                <input type="text"
                       placeholder='Aktualna waga(kg)'
                       value={form.weight}
                       maxLength={3}
                       required
                       onChange={e => updateForm('weight', e.target.value)}
                       // Usunąć możliwość napisania 0 na początku

                />
                <input type="text"
                       placeholder='Wzrost(cm)'
                       value={form.height}
                       maxLength={3}
                       required
                       onChange={e => updateForm('height', e.target.value)}
                    // Usunąć możliwość napisania 0 na początku

                />
                <select onChange={e => updateForm('gender', e.target.value)}>
                    <option value="null">Wybierz płeć</option>
                    <option value="male">Mężczyzna</option>
                    <option value="female">Kobieta</option>
                </select>
                <span>Masz konto? Kliknij tutaj <Link to='/signin'>Zaloguj</Link></span>
                <Btn text={'Zarejestruj'}/>
            </form>
        </div>
    )
};