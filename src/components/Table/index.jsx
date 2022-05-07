import { Card } from '@material-ui/core';
import React from 'react';
import Chart from '../Chart';
import styles from './table.module.css';

const Table = ({caseType, countries }) => {
	return (
		<Card className={styles.container}>
			<h2>Live Cases by Country</h2>
			<div className={styles.table}>
				<table>
					<tbody className={styles.tableBody}>
						{countries &&
							countries
								.sort((a, b) => b.cases - a.cases)
								.map(({ name, cases }, i) => (
									<tr key={i}>
										<td>{name}</td>
										<td style={{ textAlign: 'right' }}>{cases}</td>
									</tr>
								))}
					</tbody>
				</table>
			</div>
			<h2>Worldwide new cases</h2>

			<Chart caseType={caseType} />
		</Card>
	);
};

export default Table;
