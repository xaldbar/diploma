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

interface Column {
	id: 'name' | 'worksCount' | 'mark'
	label: string;
	width?: string;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'ФИО студента', width: 'auto' },
	{ id: 'worksCount', label: 'Количество баллов', width: '400px' },
	{
		id: 'mark',
		label: 'Оценка',
		width: '200px',
	},
];

interface Data {
	name: string;
	worksCount: number;
	mark: number;
}

function createData(
	name: string,
	worksCount: number,
	mark: number,
): Data {
	return { name, worksCount, mark };
}

const rows = [
	createData('Никита Иванов', 50, 4),
	createData('Алиса Петрова', 30, 3),
	createData('Максим Захаров', 40, 3),
	createData('Анна Ковалева', 35, 3),
	createData('Денис Смирнов', 18, 2),
	createData('Екатерина Попова',55, 5),
	createData('Игорь Лебедев', 40, 3),
	createData('Мария Соколова', 60, 5),
	createData('Александр Иванов', 10, 2),
];







export default function MarksTable() {
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
										textAlign: column.id === 'name' ? 'left' : 'center',
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
								<TableRow hover role="checkbox" tabIndex={-1} key={row.worksCount}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{column.id === 'mark' && row_id === 1 ? (
													<TextField
														value={undefined}
														onChange={() => {
														}}
														label={'Оценка'}
														size={'small'}
														variant={'outlined'}
														placeholder={'4'}
														type={'text'}
													/>
												) : (
													<div style={{
														width: '100%',
														textAlign: column.id === 'name' ? 'left' : 'center',
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