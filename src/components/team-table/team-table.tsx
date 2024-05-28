import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
	id: 'name' | 'count'
	label: string;
	width?: string;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'ФИО студента', width: 'auto' },
	{ id: 'count', label: 'Количество баллов', width: 'auto' },
];

interface Data {
	name: string;
	count: number;
}

function createData(
	name: string,
	count: number,
): Data {
	return { name, count };
}

const rows = [
	createData('Никита Иванов', 35),
	createData('Алиса Петрова', 35),
	createData('Максим Захаров', 30),
];

export default function TeamTable() {
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
								<TableRow hover role="checkbox" tabIndex={-1} key={row_id}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												<div style={{
													width: '100%',
													textAlign: column.id === 'name' ? 'left' : 'center',
												}}>{value}</div>
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