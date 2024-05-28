import styles from './login-page.module.css'
import DefaultLayout from "../../layouts/default.tsx";
import LoginForm from "../../components/login-form/login-form.tsx";

const LoginPage = () => {

	return (
		<DefaultLayout>
			<div className={styles.loginPage}>
				<div className={styles.formWrapper}>
					<LoginForm/>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default LoginPage;