import {useNavigate, useParams} from "react-router-dom";
import DefaultLayout from "../../layouts/default.tsx";
import {toErrorPage, toGroupPage, toWorksIdPage} from "../../core/routes/routes.ts";
import styles from './work-page.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
	Box, Button, Drawer,
	Tab,
	Tabs,
	TextField
} from "@mui/material";
import {FC, useState} from "react";
import {ProfileBlockItem} from "../profile-page/profile-page.tsx";
import {DeadlineAlertType} from "../../core/deadline/deadline.ts";
import Link from "../../components/link/link.tsx";
import MarksTable from "../../components/marks-table/marks-table.tsx";
import {Nullable} from "../../types";

export enum CourseTabs {
	ABOUT = 'ABOUT',
	WORKS = 'GROUPS',
	MARKS = 'MARKS',
}

export const COURSE_TABS: CourseTabs[] = [CourseTabs.ABOUT, CourseTabs.WORKS, CourseTabs.MARKS]

export const COURSE_TABS_LABELS: Record<CourseTabs, string> = {
	[CourseTabs.ABOUT]: 'О работе',
	[CourseTabs.WORKS]: 'Группы',
	[CourseTabs.MARKS]: 'Оценки',
}

let WORKS_MOCK: ProfileBlockItem[] = [
	{
		id: '0',
		name: 'Дипломная работа',
		instructor: 'Какой-то Преподователь',
		deadline: '28.05.24'
	}
]

let COURSES_MOCK: CourseBlockProps1[] = [
	{
		id: '0',
		title: 'Группа 1',
		tutor: 'Какой-то преподаватель',
		deadline: '28.05.24',
		subject: {
			name: 'Компьютерные сети',
			id: '0',
		},
		actualStep: {
			text: 'Использование middleware для обработки запросов и управления потоком данных',
			date: '20.09.24',
		},
		mark: 5,
		team: {
			title: 'Название команды 1',
			members: [
				{
					name: 'Никита',
					surname: 'Иванов',
				},
				{
					name: 'Алиса',
					surname: 'Петрова',
				},
				{
					name: 'Максим',
					surname: 'Захаров',
				},
			],
		}
	},
	{
		id: '1',
		title: 'Группа 2',
		tutor: 'Какой-то преподаватель',
		deadline: '28.05.24',
		subject: {
			name: 'Компьютерные сети',
			id: '0',
		},
		actualStep: {
			text: 'Настройте основные маршруты приложения, такие как главная страница, страница о нас',
			date: '12.09.25',
		},
		mark: 5,
		team: {
			title: 'Название команды 1',
			members: [
				{
					name: 'Игорь',
					surname: 'Лебедев',
				},
				{
					name: 'Мария',
					surname: 'Соколова',
				},
				{
					name: 'Александр',
					surname: 'Иванов',
				},
			],
		}
	},
	{
		id: '0',
		title: 'Группа 3',
		tutor: 'Какой-то преподаватель',
		deadline: '28.05.24',
		subject: {
			name: 'Компьютерные сети',
			id: '0',
		},
		actualStep: {
			text: 'Протестируйте работу вашего веб-приложения с помощью инструментов тестирования запросов, таких как Postman',
			date: '30.09.24',
		},
		mark: 5,
		team: {
			title: 'Название команды 1',
			members: [
				{
					name: 'Анна',
					surname: 'Ковалева',
				},
				{
					name: 'Денис',
					surname: 'Смирнов',
				},
				{
					name: 'Екатерина',
					surname: 'Попова',
				},
			],
		}
	}
]

// for (let i = 0; i < 25; i++) {
// 	COURSES_MOCK = [
// 		...COURSES_MOCK,
// 		{
// 			...COURSES_MOCK[0],
// 			id: `${Number(COURSES_MOCK[0].id) + 1 + i}`,
// 			title: COURSES_MOCK[0].title + ` ${i+1}`,
// 			alert: (i % 2 == 0) ? DeadlineAlertType.ALERT : DeadlineAlertType.WARNING,
// 		},
// 	]
// }

for (let i = 0; i < 25; i++) {

	WORKS_MOCK = [
		...WORKS_MOCK,
		{
			...WORKS_MOCK[0],
			name: WORKS_MOCK[0].name + ` ${i+1}`,
			id: `${Number(WORKS_MOCK[0].id) + 1 + i}`,
			alert: (i % 2 == 0) ? DeadlineAlertType.ALERT : DeadlineAlertType.WARNING,
		}
	]
}

export interface WorkMember {
	name: string
	surname: string
}

export interface WorkTeam {
	title: string
	members: WorkMember[]
}

export interface CourseBlockProps1 {
	id: string
	title: string
	tutor: string
	subject: {
		name: string
		id: string
	}
	deadline?: string
	actualStep: {
		text: string,
		date: string,
	}
	alert?: DeadlineAlertType
	mark?: number,
	team: WorkTeam
}


type DrawerType = 'edit' | 'delete'

const CourseBlock: FC<CourseBlockProps1> = (props) => {
	const {  title, id, actualStep, team } = props
	let wrapperClass = styles.courseBlock

	// if (props.alert) {
	// 	if (props.alert === DeadlineAlertType.ALERT) {
	// 		wrapperClass += ` ${styles.alert}`
	// 	} else {
	// 		wrapperClass += ` ${styles.warning}`
	// 	}
	// }

	return (
		<Link to={toGroupPage(id)}>
			<div className={wrapperClass}>
				<div className={styles.headerWrapper}>
					<div className={styles.courseTitle}>{title}</div>
				</div>
				<div className={styles.courseTutor}>Текущий этап: {actualStep.text} ({actualStep.date})</div>
				<div className={styles.team}>
					<div className={styles.teamList}>
						{team.members.map((member, index) => (
							<div key={member.name + member.surname + index} className={styles.courseTutor}><b>{member.name} {member.surname}</b></div>
						))}
					</div>
				</div>
			</div>
		</Link>
	)
}
const CoursePage = () => {
	const [currentTab, setCurrentTab] = useState<CourseTabs>(CourseTabs.ABOUT)
	const [drawerOpened, setDrawerOpen] = useState<boolean>(false)
	const [openDrawerType, setOpenDrawerType] = useState<Nullable<DrawerType>>(null)
	const handleTabChange = (tab: CourseTabs) => {
		setCurrentTab(tab)
	}

	const openDrawer = (drawerType: DrawerType) => {
		setOpenDrawerType(drawerType)
		setDrawerOpen(true)
	}

	const closeDrawer = () => {
		setOpenDrawerType(null)
		setDrawerOpen(false)
	}

	const renderTabs = () => {
		return (
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={currentTab}
					onChange={(_, value) => handleTabChange(value)}
				>
					{
						COURSE_TABS.map((tab) => (
							<Tab key={tab} value={tab} label={COURSE_TABS_LABELS[tab]}/>
						))
					}
				</Tabs>
			</Box>
		)
	}

	const renderHeader = () => {
		return (
			<div className={styles.header}>
				<div className={styles.coursePageTitle}>
					Лабораторная работа 1
				</div>
				{/*<div className={styles.actions}>*/}
				{/*	<EditIcon className={styles.edit} onClick={() => openDrawer('edit')}/>*/}
				{/*	<DeleteIcon className={styles.delete}  onClick={() => openDrawer('delete')}/>*/}
				{/*</div>*/}
			</div>
		)
	}

	const renderAboutContent = () => {
		return (
			<div className={styles.content}>
				<div className={styles.description}>
					<div className={styles.blockTitle}>Калькулятор</div>
					<div className={styles.descriptionText}>
						<b>Цель работы</b> <br/> <br/>
						Необходимо разработать программную библиотеку на языке C или
						C++, реализующую простейшие арифметические действия и проверку
						условий над целыми неотрицательными числами. На основании этой
						библиотеки, нужно составить программу, выполняющую вычисления
						над парами десятичных чисел и выводящую результат на стандартный
						файл вывода.
						<br/> <br/>
						<b>Задачи</b> <br/> <br/>
						1. Настройка окружения разработки: установка Node.js, npm и Express. <br/>
						2. Создание простого веб-приложения с несколькими маршрутами и обработчиками запросов. <br/>
						3. Использование middleware для обработки запросов и управления потоком данных. <br/>
						4. Реализация базовой аутентификации пользователей. <br/>
						5. Отладка приложения и тестирование различных эндпоинтов. <br/> <br/>
						<b>Дополнительные указания</b> <br/> <br/>
						При реализации деления можно ограничить делитель
						цифрой внтуреннего пред- ставления «длинных» чисел, в этом случае
						максимальная оценка, которую можно получить за лабораторную
						работу, будет ограничена оценкой 3 («удовлетворительно»).
						В случае возникновения переполнения в результате вычислений,
						попытки вычесть из меньшего числа большее, деления на ноль или
						возведении нуля в нулевую степень, программа должна вывести на
						экран строку Error. <br/>
					</div>
					<div className={styles.files}>
						<Link to={'/files/asdadas'}>Приложеные Файлы</Link>
					</div>
				</div>
			</div>
		)
	}

	const renderWorksContent = () => {
		return (
			<div className={styles.workTab}>
			<div className={styles.filter}>
					<TextField
						value={undefined}
						onChange={() => {
						}}
						label={'Название группы'}
						size={'small'}
						variant={'outlined'}
						placeholder={'Название группы'}
						type={'text'}
					/>
					<TextField
						value={undefined}
						onChange={() => {
						}}
						label={'ФИО студента'}
						size={'small'}
						variant={'outlined'}
						placeholder={'ФИО студента'}
						type={'text'}
					/>

			</div>
				<div className={styles.worksTabList}>
					{COURSES_MOCK.map((course) => (
						<CourseBlock
							key={course.id}
							id={course.id}
							title={course.title}
							tutor={course.tutor}
							deadline={course.deadline}
							alert={course.alert}
							actualStep={course.actualStep}
							mark={course.mark}
							subject={course.subject}
							team={course.team}
						/>
					))}
				</div>
			</div>

		)
	}

	const renderMarksContent = () => {
		return (
			<div className={styles.markTab}>
				<MarksTable/>
			</div>
		)
	}

	const RENDER_CONTENT_MAP: Record<CourseTabs, any> = {
		[CourseTabs.ABOUT]: renderAboutContent,
		[CourseTabs.WORKS]: renderWorksContent,
		[CourseTabs.MARKS]: renderMarksContent,
	}


	const renderContent = () => {
		const renderFunction = RENDER_CONTENT_MAP[currentTab]
		return renderFunction()
	}

	const renderDrawerContent = (drawerType: DrawerType) => {
		switch (drawerType) {
			case 'edit': {
				return (
					<div className={styles.drawerContent}>

					</div>
				)
			}
			case "delete":
				return 'delete'
			default: {
				return <div>default</div>
			}
		}
	}

	const renderDrawerFooter = (drawerType: DrawerType) => {
		switch (drawerType) {
			case 'edit': {
				return (
					<div className={styles.drawerFooter}>
						<Button variant={'contained'} onClick={closeDrawer}>
							Сохранить
						</Button>
						<Button variant={'outlined'} onClick={closeDrawer}>
							Закрыть
						</Button>
					</div>
				)
			}
			case "delete":
				return (
					<div className={styles.drawerFooter}>
						<Button onClick={closeDrawer}>
							Удалить
						</Button>
						<Button onClick={closeDrawer}>
							Закрыть
						</Button>
					</div>
				)
		}
	}

	const renderDrawerTitle = (drawerType: DrawerType) => {
		switch (drawerType) {
			case 'edit': {
				return (
					<div className={styles.drawerTitle}>
						Редактировать работу
					</div>
				)
			}
			case "delete":
				return (
					<div className={styles.drawerTitle}>
						Удалить работу
					</div>
				)
		}
	}

	const renderDrawer = () => {
		if (!openDrawerType) {
			return null
		}

		return (
			<Drawer anchor={'right'} open={drawerOpened} onClose={closeDrawer}>
				<div className={styles.drawerWrapper}>
					{renderDrawerTitle(openDrawerType)}
					{renderDrawerContent(openDrawerType)}
					{renderDrawerFooter(openDrawerType)}
				</div>

			</Drawer>
		)
	}


	return (
		<DefaultLayout>
			<div className={styles.coursePage}>
				{renderHeader()}
				{renderTabs()}
				{renderContent()}
				{renderDrawer()}
			</div>
		</DefaultLayout>
	);
};

export default CoursePage;