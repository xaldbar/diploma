import styles from './profile-page.module.css'
import {FC, ReactNode, useState} from "react";
import {Button, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {selectEmail, selectPassword} from "../../features/login/login-slice.ts";
import DefaultLayout from "../../layouts/default.tsx";
import {DeadlineAlertType} from "../../core/deadline/deadline.ts";
import Link from "../../components/link/link.tsx";
import {toCoursesIdPage, toWorksIdPage} from "../../core/routes/routes.ts";

export interface ProfileBlockItem {
	id: string
	name: string
	instructor: string
	alert?: DeadlineAlertType
	deadline?: string
}

export interface ProfileBlockProps {
	title: string
	content: ReactNode
	className?: string
}

export interface ProfileBlockListProps {
	items: ProfileBlockItem[]
	type: 'courses' | 'works'
	showTutor?: boolean
}

export interface ProfileBlockListItemProps {
	item: ProfileBlockItem
	type: 'courses' | 'works'
	showTutor?: boolean
}

let COURSES_MOCK: ProfileBlockItem[] = [
	{
		id: '0',
		name: 'Математический анализ',
		instructor: 'Евгения Смирнова',
	},
	{
		id: '0',
		name: 'Дискретный Анализ',
		instructor: 'Артем Лазарев',
	},
	{
		id: '0',
		name: 'Компьютерные сети',
		instructor: 'Анна Кузнецова',
	},
	{
		id: '0',
		name: 'Философия',
		instructor: 'Даниил Федоров',
	},
	{
		id: '0',
		name: 'Компьютерная графика',
		instructor: 'Ольга Морозова',
	},
]

let WORKS_MOCK: ProfileBlockItem[] = [
	{
		id: '0',
		name: 'Лабораторная работа',
		instructor: 'Какой-то Преподователь',
		deadline: '28.05.24'
	}
]


for (let i = 0; i < 25; i++) {
	COURSES_MOCK = [
		...COURSES_MOCK,
		{
			...COURSES_MOCK[0],
			id: `${Number(COURSES_MOCK[0].id) + 1 + i}`,
			name: COURSES_MOCK[0].name + ` ${i+1}`,
		},
	]

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

export const PROFILE_BLOCK_LIST_ITEM_ALERT_CLASS_MAP: Record<DeadlineAlertType, string> = {
	[DeadlineAlertType.ALERT]: styles.alert,
	[DeadlineAlertType.WARNING]: styles.warning,
}

const ProfileBlock: FC<ProfileBlockProps> = (props) => {
	const { title, content } = props

	const className = props.className ? styles.profileBlock + ` ${props.className}` : styles.profileBlock

	return (
		<div className={className}>
			<div className={styles.profileBlockTitle}>
				{title}
			</div>
			{content}
		</div>
	)
}

export const ProfileBlockListItem: FC<ProfileBlockListItemProps> = (props) => {
	let itemClassName = styles.listItem
	// if (props.item.alert) {
	// 	itemClassName = itemClassName + ' ' + PROFILE_BLOCK_LIST_ITEM_ALERT_CLASS_MAP[props.item.alert]
	// }

	const toPage = props.type === 'courses' ? toCoursesIdPage : toWorksIdPage

	return (
		<Link to={toPage(props.item.id)}>
			<div className={itemClassName}>
				<div className={styles.itemTitle}>{props.item.name}</div>
				{props.showTutor !== undefined && !props.showTutor ?  null : <div className={styles.itemInstructor}>Преподаватель: {props.item.instructor}</div>}
				{props.item.deadline ? <div className={styles.itemDeadline}>Срок сдачи: {props.item.deadline}</div> : null}
			</div>
		</Link>
	)
}

export const ProfileBlockList: FC<ProfileBlockListProps> = (props) => {
	const {items, type} = props
	return (
		<div className={styles.listWrapper}>
			{items.map(((item, i) => <ProfileBlockListItem item={item} key={i} type={type} showTutor={props.showTutor}/>))}
		</div>
	)
}

const ProfilePage = () => {
	const password = useSelector(selectPassword)
	const email = useSelector(selectEmail)

	const [currentPassword, setCurrentPassword] = useState(password)

	const renderInformationContent = () => {
		return (
			<div className={styles.informationContent}>
				<TextField
					value={email}
					label={'email'}
					size={'small'}
					variant={'outlined'}
					placeholder={'example@email.com'}
					type={'email'}
				/>
				<div className={styles.passwordInformation}>
					<TextField
						value={currentPassword}
						onChange={(value) => setCurrentPassword(value.target.value)}
						label={'password'}
						size={'small'}
						variant={'outlined'}
						placeholder={'*******'}
						type={'password'}
					/>
					<Button
						color={'inherit'}
					>
						Изменить пароль
					</Button>
				</div>
			</div>
		)
	}

	const renderCoursesContent = () => {
		return (
			<ProfileBlockList items={COURSES_MOCK} type={'courses'}/>
		)
	}


	const renderWorksContent = () => {
		return (
			<ProfileBlockList items={WORKS_MOCK.slice(1)} type={'works'}/>
		)
	}

	return (
		<DefaultLayout>
			<div className={styles.profilePage}>
				<div className={styles.top}>
					<ProfileBlock title={'Информация'} content={renderInformationContent()}/>
					<ProfileBlock title={'Предметы'} content={renderCoursesContent()}/>
				</div>
				<ProfileBlock className={styles.worksBlock} title={'Работы'} content={renderWorksContent()}/>
			</div>
		</DefaultLayout>
	);
};

export default ProfilePage;