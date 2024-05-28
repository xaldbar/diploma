import styles from './header.module.css'
import Container from "../container/container.tsx";
import {toCoursesPage, toLoginPage, toProfilePage, toWorksPage} from "../../core/routes/routes.ts";
import Link from '../link/link.tsx';
import {useSelector} from "react-redux";
import {selectIsLogin, setIsLoggedIn, setEmail} from "../../features/login/login-slice.ts";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../store";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {LOGOUT_RESTRICTED_PAGES} from "../../core/constants/routes.ts";

const Header = () => {
	const isLoggedIn = useSelector(selectIsLogin)
	const dispatch = useAppDispatch()
	const location = useLocation();

	const logout = () => {
		dispatch(setIsLoggedIn(false))
		dispatch(setEmail(null))
	}

	const navigate = useNavigate();
	useEffect(() => {
		if (isLoggedIn) {
			return
		}

		if (!LOGOUT_RESTRICTED_PAGES.includes(location.pathname)) {
			return
		}

		navigate(toCoursesPage())
	}, [isLoggedIn])

	const renderRightPart = () => {
		if (isLoggedIn) {
			return (
				<>
					<Link to={toProfilePage()} className={styles.login}>Баранов Алексей</Link>
					<Button onClick={logout} variant={'text'} size={'small'}>Выйти</Button>
				</>
			)
		}

		return (
			<div className={styles.headerItem}>
				<Link to={toLoginPage()}>Войти</Link>
			</div>
		)
	}

	return (
		<div className={styles.headerWrapper}>
			<Container>
				<div className={styles.header}>
					<div className={styles.leftPart}>
						<div className={styles.headerItem}>
							<Link to={toCoursesPage()}>Предметы</Link>
						</div>
						<div className={styles.headerItem}>
							<Link to={toWorksPage()}>Мои работы</Link>
						</div>
					</div>
					<div className={styles.rightPart}>
						{renderRightPart()}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Header;