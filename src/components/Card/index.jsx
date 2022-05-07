import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import styles from './card.module.css';
import CountUp from 'react-countup';
const SingleCard = ({ header,active, color,onClick, stats, total }) => {
	return (
		<Grid
			onClick={onClick}
			xs={3}
			className={styles.container}
			item
			component={Card}
			style={{ cursor:"pointer",borderBottom: active ? `4px solid ${color}` : 'none' }}
		>
			<CardContent>
				<Typography color="textPrimary"> {header}</Typography>
				<Typography style={{ color, fontWeight: 'bold' }}>
					+ <CountUp seperator="," duration={1.3} start={0} end={stats} />{' '}
				</Typography>
				<Typography color="textSecondary"> {total}</Typography>
			</CardContent>
		</Grid>
	);
};

export default SingleCard;
