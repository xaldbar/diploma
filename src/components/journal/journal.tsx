import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {TextField} from "@mui/material";
import Link from "../link/link.tsx";

interface Column {
	id: 'task' | 'diff' | 'assigner' | 'deadline' | 'publish' | 'result'
	label: string;
	width?: string;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'task', label: 'Задание', width: 'auto' },
	{ id: 'diff', label: 'Сложность', width: '100px' },
	{
		id: 'assigner',
		label: 'Ответственный',
		width: '200px',
	},
	{
		id: 'deadline',
		label: 'Дедлайн',
		width: '100px',
	},
	{
		id: 'publish',
		label: 'Дата загрузки',
		width: '100px',
	},
	{
		id: 'result',
		label: 'Результат',
		width: '100px',
	},
];


interface Data {
	task: string;
	diff: string
	assigner: string;
	deadline: string;
	publish: string;
	result: string;
}

function createData(
	task: string,
	diff: string,
	assigner: string,
	deadline: string,
	publish: string,
	result: string,
): Data {
	return { task, diff, assigner, deadline, publish, result};
}

const rows = [
	createData('Написание базовой функциональности', '5', 'Никита Иванов', '12.09.2025', '13.09.2025', 'asdsadas'),
	createData('Обработка ошибок и исключений', '15', 'Алиса Петрова', '15.09.2025', '18.09.2025', 'asdsadas'),
	createData('Оптимизация', '50', 'Никита Иванов', '20.09.2025', '19.09.2025', 'asdsadas'),
	createData('Тестирование', '30', 'Максим Захаров', '27.09.2025', '24.09.2025', 'asdsadas'),
	createData('Документирование', '20', 'Алиса Петрова', '30.09.2025', '25.09.2025', 'asdsadas'),
];

export default function Journal() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (_: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 700 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{
										width: column.width,
										textAlign: column.id === 'task' ? 'left' : 'center',
								}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row, row_id) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row_id}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{column.id === 'result' ? (
													<Link to={'/adsasdasd'}>Результат</Link>
												) : (
													<div style={{
														width: '100%',
														textAlign: column.id === 'task' ? 'left' : 'center',
													}}>{value}</div>
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}