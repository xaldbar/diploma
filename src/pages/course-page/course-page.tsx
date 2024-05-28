import {useNavigate, useParams} from "react-router-dom";
import DefaultLayout from "../../layouts/default.tsx";
import {toErrorPage, toWorksIdPage} from "../../core/routes/routes.ts";
import styles from './course-page.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
	Box,
	Tab,
	Tabs,
	TextField
} from "@mui/material";
import {FC, useState} from "react";
import {ProfileBlockItem, ProfileBlockList} from "../profile-page/profile-page.tsx";
import {DeadlineAlertType} from "../../core/deadline/deadline.ts";
import Link from "../../components/link/link.tsx";
import MarksTable from "../../components/marks-table/marks-table.tsx";

export enum CourseTabs {
	ABOUT = 'ABOUT',
	WORKS = 'WORKS',
	MARKS = 'MARKS',
}

export const COURSE_TABS: CourseTabs[] = [CourseTabs.ABOUT, CourseTabs.WORKS, CourseTabs.MARKS]

export const COURSE_TABS_LABELS: Record<CourseTabs, string> = {
	[CourseTabs.ABOUT]: 'О Предмете',
	[CourseTabs.WORKS]: 'Задания',
	[CourseTabs.MARKS]: 'Оценки',
}

let WORKS_MOCK: ProfileBlockItem[] = [
	{
		id: '0',
		name: 'Лабораторная работа 1',
		instructor: 'Какой-то Преподователь',
		deadline: '30.09.24'
	},
	{
		id: '0',
		name: 'Лабораторная работа 2',
		instructor: 'Какой-то Преподователь',
		deadline: '7.10.24'
	},
	{
		id: '0',
		name: 'Лабораторная работа 3',
		instructor: 'Какой-то Преподователь',
		deadline: '22.10.24'
	},
	{
		id: '0',
		name: 'Лабораторная работа 4',
		instructor: 'Какой-то Преподователь',
		deadline: '05.11.24'
	},
	{
		id: '0',
		name: 'Лабораторная работа 5',
		instructor: 'Какой-то Преподователь',
		deadline: '20.11.24'
	},
	{
		id: '0',
		name: 'Лабораторная работа 6',
		instructor: 'Какой-то Преподователь',
		deadline: '05.12.24'
	},
	{
		id: '0',
		name: 'Лабораторная работа 7',
		instructor: 'Какой-то Преподователь',
		deadline: '28.12.24'
	},
]

let COURSES_MOCK: CourseBlockProps1[] = [
	{
		id: '0',
		title: 'Дискретный анализ',
		tutor: 'Какой-то преподаватель',
		deadline: '30.09.24',
		subject: {
			name: 'Компьютерные сети',
			id: '0',
		},
		actualStep: {
			text: 'Формирование структуры дипломнной работы',
			date: '7.10.24',
		},
	},
	{
		id: '1',
		title: 'Лабораторная работа',
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
	},
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
}

const CourseBlock: FC<CourseBlockProps1> = (props) => {
	const {  title, id, deadline } = props
	let wrapperClass = styles.courseBlock

	// if (props.alert) {
	// 	if (props.alert === DeadlineAlertType.ALERT) {
	// 		wrapperClass += ` ${styles.alert}`
	// 	} else {
	// 		wrapperClass += ` ${styles.warning}`
	// 	}
	// }

	return (
		<Link to={toWorksIdPage(id)}>
			<div className={wrapperClass}>
				<div className={styles.headerWrapper}>
					<div className={styles.courseTitle}>{title}</div>
					{/*{mark ? <div className={styles.courseTutor}><b>Оценка: {mark}</b></div> : null}*/}
				</div>
				<div className={styles.courseTutor}>Срок: {deadline}</div>
				{/*<div className={styles.courseTutor}>Текущий этап: {actualStep.text} ({actualStep.date})</div>*/}
				{/*<div className={styles.team}>*/}
				{/*	<div className={styles.teamTitle}>{team.title}</div>*/}
				{/*	<div className={styles.teamList}>*/}
				{/*		{team.members.map((member) => (*/}
				{/*			<div>{member.name} {member.surname}</div>*/}
				{/*		))}*/}
				{/*	</div>*/}
				{/*</div>*/}
			</div>
		</Link>
	)
}
const CoursePage = () => {
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
							<Tab value={tab} label={COURSE_TABS_LABELS[tab]} key={tab}/>
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
					{course?.title}
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
				<div className={styles.description}>
					<div className={styles.blockTitle}>Описание</div>
					<div className={styles.descriptionText}>Дискретный анализ - это раздел математики и информатики, который изучает объекты, значения которых являются разрывными или дискретными, в отличие от непрерывных значений. В рамках дискретного анализа исследуются различные дискретные структуры данных, такие как графы, деревья, последовательности, отношения и другие.</div>
				</div>
				<div className={styles.grid}>
					<div className={styles.worksList}>
						<div className={styles.blockTitle}>Работы курса</div>
						<div className={styles.listWrapper}>
							<ProfileBlockList
								items={WORKS_MOCK}
								type={'works'}
								showTutor={false}
							/>
						</div>
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
						label={'Название работы'}
						size={'small'}
						variant={'outlined'}
						placeholder={'Название работы'}
						type={'text'}
					/>
				</div>
				<div className={styles.worksTabList}>
					{COURSES_MOCK.slice(1).map((course) => (
						<CourseBlock
							id={course.id}
							title={course.title}
							tutor={course.tutor}
							deadline={course.deadline}
							alert={course.alert}
							actualStep={course.actualStep}
							subject={course.subject}
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

export default CoursePage;