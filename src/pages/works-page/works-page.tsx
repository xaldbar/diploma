import DefaultLayout from "../../layouts/default.tsx";
import Container from "../../components/container/container.tsx";
import styles from './works.module.css'
import {FC} from "react";
import Link from "../../components/link/link.tsx";
import {toCoursesIdPage, toWorksIdPage} from "../../core/routes/routes.ts";
import {DeadlineAlertType} from "../../core/deadline/deadline.ts";
import {Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";

export interface CourseBlockProps {
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
}

let COURSES_MOCK: CourseBlockProps[] = [
	{
		id: '0',
		title: 'Дипломная работа',
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

const CourseBlock: FC<CourseBlockProps> = (props) => {
	const { title, tutor, id, deadline, actualStep, mark, subject } = props
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
					{mark ? <div className={styles.courseTutor}><b>Оценка: {mark}</b></div> : null}
				</div>
				<div className={styles.courseTutor}>Предмет: <Link to={toCoursesIdPage(subject.id)}>{subject.name}</Link></div>
				<div className={styles.courseTutor}>{tutor}</div>
				<div className={styles.courseTutor}>Срок: {deadline}</div>
				<div className={styles.courseTutor}>Текущий этап: {actualStep.text} ({actualStep.date})</div>
			</div>
		</Link>
	)
}

const CoursesPage = () => {
	return (
		<DefaultLayout>
			<Container>
				<div className={styles.coursesPage}>
					<div className={styles.filter}>
						<TextField
							value={undefined}
							onChange={() => {}}
							label={'Название работы'}
							size={'small'}
							variant={'outlined'}
							placeholder={'Название работы'}
							type={'text'}
						/>

						<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
							<InputLabel id="demo-select-small-label">Преподаватель</InputLabel>
							<Select
								labelId="demo-select-small-label"
								id="demo-select-small"
								value={''}
								label="Преподаватель"
								onChange={() => {}}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
						<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
							<InputLabel id="demo-select-small-label">Оценка</InputLabel>
							<Select
								labelId="demo-select-small-label"
								id="demo-select-small"
								value={''}
								label="Оценка"
								onChange={() => {}}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
						<FormControlLabel className={styles.test} control={<Checkbox />} label="Показать актуальные работы" />
					</div>
					<div className={styles.coursesGrid}>
						{COURSES_MOCK.map((course) => (
							<CourseBlock
								id={course.id}
								title={course.title}
								tutor={course.tutor}
								deadline={course.deadline}
								alert={course.alert}
								actualStep={course.actualStep}
								mark={course.mark}
								subject={course.subject}
							/>
						))}
					</div>
				</div>
			</Container>
		</DefaultLayout>
	);
};

export default CoursesPage;