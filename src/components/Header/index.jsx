import { FormControl, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { fetchCountries } from '../../api';
import styles from './header.module.css';

const Header = ({ selectedCountrie, setSelectedCountrie, countries }) => {
	return (
		<nav className={styles.container}>
			<h1>COVID 19 TRACKER</h1>
			<div>
				<FormControl className={styles.formContol}>
					<Select
						variant="outlined"
						onChange={(e) => setSelectedCountrie(e.target.value)}
						autoWidth
						value={selectedCountrie}
						className={styles.select}
						defaultValue={'worldwide'}
					>
						<option  value={'worldwide'}>worldwide</option>
						{countries &&
							countries.map((countrie, i) => (
								<option key={i} value={countrie.isoValue}>
									{countrie.name}
								</option>
							))}
					</Select>
				</FormControl>
			</div>
		</nav>
	);
};

export default Header;
