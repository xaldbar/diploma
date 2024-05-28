import {useNavigate, useParams} from "react-router-dom";
import DefaultLayout from "../../layouts/default.tsx";
import {toErrorPage } from "../../core/routes/routes.ts";
import styles from './group-page.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FaceIcon from '@mui/icons-material/Face';
import {
	Box,
	Tab,
	Tabs,
} from "@mui/material";
import { useState} from "react";
import {ProfileBlockItem} from "../profile-page/profile-page.tsx";
import {DeadlineAlertType} from "../../core/deadline/deadline.ts";
import Journal from "../../components/journal/journal.tsx";
import TeamTable from "../../components/team-table/team-table.tsx";

export enum CourseTabs {
	ABOUT = 'ABOUT',
	WORKS = 'GROUPS',
	MARKS = 'MARKS',
}

export const COURSE_TABS: CourseTabs[] = [CourseTabs.ABOUT, CourseTabs.WORKS]

export const COURSE_TABS_LABELS: Record<CourseTabs, string> = {
	[CourseTabs.ABOUT]: 'О команде',
	[CourseTabs.WORKS]: 'Журнал',
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
		title: 'Название команды',
		tutor: 'Какой-то преподаватель',
		deadline: '28.05.24',
		subject: {
			name: 'Компьютерные сети',
			id: '0',
		},
		actualStep: {
			text: 'Формирование структуры дипломнной работы',
			date: '25.05.24',
		},
		mark: 5,
		team: {
			title: 'Название команды 1',
			members: [
				{
					name: 'Имя',
					surname: 'Фамилия',
				},
				{
					name: 'Имя 2',
					surname: 'Фамилия 2',
				},
				{
					name: 'Имя 3',
					surname: 'Фамилия 3',
				},
			],
		}
	}
]

for (let i = 0; i < 25; i++) {
	COURSES_MOCK = [
		...COURSES_MOCK,
		{
			...COURSES_MOCK[0],
			id: `${Number(COURSES_MOCK[0].id) + 1 + i}`,
			title: COURSES_MOCK[0].title + ` ${i+1}`,
			alert: (i % 2 == 0) ? DeadlineAlertType.ALERT : DeadlineAlertType.WARNING,
		},
	]
}

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

const GroupPage = () => {
	const { id } = useParams()
	const navigate = useNavigate();
	const course = COURSES_MOCK.find(item => item.id === id)
	const [currentTab, setCurrentTab] = useState<CourseTabs>(CourseTabs.ABOUT)

	if (!course) {
		navigate(toErrorPage())
	}

	const handleTabChange = (tab: CourseTabs) => {
		setCurrentTab(tab)
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
							<Tab value={tab} label={COURSE_TABS_LABELS[tab]}/>
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
					Группа 1
				</div>
				<div className={styles.actions}>
					<EditIcon className={styles.edit}/>
					<DeleteIcon className={styles.delete}/>
				</div>
			</div>
		)
	}

	const renderAboutContent = () => {
		return (
			<div className={styles.content}>
				<div className={styles.grid}>
					<div className={styles.teamInfo}>
						<div className={styles.teamMembers}>
							<div className={styles.teamMembersTitle}>Состав команды</div>
							<TeamTable/>
						</div>
					</div>
					<div className={styles.work}>
						<div className={styles.workTitle}>Лабораторная работа 1</div>
						<div className={styles.workDescription}>Необходимо разработать программную библиотеку на языке C или
							C++, реализующую простейшие арифметические действия и проверку
							условий над целыми неотрицательными числами. На основании этой
							библиотеки, нужно составить программу, выполняющую вычисления
							над парами десятичных чисел и выводящую результат на стандартный
							файл вывода.</div>

						1. Настройка окружения разработки: установка Node.js, npm и Express. <br/>
						2. Создание простого веб-приложения с несколькими маршрутами и обработчиками запросов. <br/>
						3. Использование middleware для обработки запросов и управления потоком данных. <br/>
						4. Реализация базовой аутентификации пользователей. <br/>
						5. Отладка приложения и тестирование различных эндпоинтов. <br/> <br/>
						При реализации деления можно ограничить делитель
						цифрой внтуреннего пред- ставления «длинных» чисел, в этом случае
						максимальная оценка, которую можно получить за лабораторную
						работу, будет ограничена оценкой 3 («удовлетворительно»).
						В случае возникновения переполнения в результате вычислений,
						попытки вычесть из меньшего числа большее, деления на ноль или
						возведении нуля в нулевую степень, программа должна вывести на
						экран строку Error. <br/>
					</div>
				</div>
			</div>
		)
	}

	const renderWorksContent = () => {
		return (
			<div className={styles.workTab}>
				<Journal/>
			</div>

		)
	}

	const renderMarksContent = () => {
		return (
			<div className={styles.markTab}>
				<Journal/>
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


	return (
		<DefaultLayout>
			<div className={styles.coursePage}>
				{renderHeader()}
				{renderTabs()}
				{renderContent()}
			</div>
		</DefaultLayout>
	);
};

export default GroupPage;