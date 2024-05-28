import styles from './login-form.module.css'
import { TextField, Button } from "@mui/material";
import {useState} from "react";
import {setIsLoggedIn, setEmail as setSliceEmail, setPassword as setSlicePassword } from "../../features/login/login-slice.ts";
import {useAppDispatch} from "../../store";
import {toCoursesPage} from "../../core/routes/routes.ts";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const dispatch = useAppDispatch()
	const navigate = useNavigate();

	const onLogin = (e:  React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!email || !password) {
			return
		}

		dispatch(setIsLoggedIn(true))
		dispatch(setSliceEmail(email))
		dispatch(setSlicePassword(password))
		return navigate(toCoursesPage())

	}

	return (
		<div className={styles.formWrapper}>
			<form className={styles.form} onSubmit={onLogin}>
				<div className={styles.formTitle}>Регистрация</div>
				<TextField
					value={email}
					onChange={(value) => setEmail(value.target.value)}
					label={'email'}
					size={'small'}
					variant={'outlined'}
					placeholder={'example@email.com'}
					type={'email'}
				/>
				<TextField
					value={password}
					onChange={(value) => setPassword(value.target.value)}
					label={'Пароль'}
					size={'small'}
					variant={'outlined'}
					placeholder={'*******'}
					type={'password'}
				/>
				<TextField
					value={password}
					onChange={(value) => setPassword(value.target.value)}
					label={'Повтор пароля'}
					size={'small'}
					variant={'outlined'}
					placeholder={'*******'}
					type={'password'}
				/>
				<Button variant="contained" type={'submit'}>Зарегестрироваться</Button>
			</form>
		</div>
	);
};

export default LoginForm;