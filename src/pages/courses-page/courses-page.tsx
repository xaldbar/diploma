import DefaultLayout from "../../layouts/default.tsx";
import Container from "../../components/container/container.tsx";
import styles from './courses-page.module.css'
import {FC} from "react";
import Link from "../../components/link/link.tsx";
import {toCoursesIdPage} from "../../core/routes/routes.ts";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export interface CourseBlockProps {
	id: string
	title: string
	tutor: string
	works: number
}

export let COURSES_MOCK: CourseBlockProps[] = [
	{
		id: '0',
		title: 'Математический Анализ',
		tutor: 'Евгения Смирнова',
		works: 3
	},
	{
		id: '0',
		title: 'Дискретный Анализ',
		tutor: 'Артем Лазарев',
		works: 2
	},
	{
		id: '0',
		title: 'Компьютерные сети',
		tutor: 'Анна Кузнецова',
		works: 6
	},
	{
		id: '0',
		title: 'Философия',
		tutor: 'Даниил Федоров',
		works: 2
	},
	{
		id: '0',
		title: 'Компьютерная графика',
		tutor: 'Ольга Морозова',
		works: 5
	},
]


const CourseBlock: FC<CourseBlockProps> = (props) => {
	const { title, tutor, id, works } = props
	return (
		<Link to={toCoursesIdPage(id)}>
			<div className={styles.courseBlock}>
				<div className={styles.courseTitle}>{title}</div>
				<div className={styles.courseTutor}>Работ: {works}</div>
				<div className={styles.courseTutor}>Преподаватель: {tutor}</div>
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
							label={'Название прдемета'}
							size={'small'}
							variant={'outlined'}
							placeholder={'Название прдемета'}
							type={'text'}
						/>

						<FormControl sx={{m: 1, minWidth: 120}} size="small">
							<InputLabel id="demo-select-small-label">Преподаватель</InputLabel>
							<Select
								labelId="demo-select-small-label"
								id="demo-select-small"
								value={''}
								label="Преподаватель"
								onChange={() => {
								}}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>

					</div>
					<div className={styles.coursesGrid}>
						{COURSES_MOCK.map((course) => (
							<CourseBlock
								id={course.id}
								title={course.title}
								tutor={course.tutor}
								works={course.works}
							/>
						))}
					</div>
				</div>
			</Container>
		</DefaultLayout>
	);
};

export default CoursesPage;