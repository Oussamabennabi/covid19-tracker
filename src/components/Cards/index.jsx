import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { fetchCountryInfo } from '../../api';
import SingleCard from '../Card';
import styles from './cards.module.css';

const Cards = ({ setCaseType,caseType, selectedCountrie, countryInfo }) => {
	
	return (
		<Grid
			container
			spacing={1}
			style={{ gap: '.5rem' }}
			justifyContent={'space-between'}
			className={styles.container}
		>
			<SingleCard
				active={caseType === "cases"}
				onClick={()=>setCaseType("cases")}
				header={'Coronavirus cases'}
				color="rgba(255,0,0,.7)"
				stats={countryInfo.todayCases}
				total={countryInfo.cases}
			/>
			<SingleCard
				active={caseType === "recovered"}
				onClick={()=>setCaseType("recovered")}
				header={'Recovered'}
				color="rgba(0,255,0,.7)"
				stats={countryInfo.todayRecovered}
				total={countryInfo.recovered}
			/>
			<SingleCard
				active={caseType === "deaths"}
				onClick={()=>setCaseType("deaths")}
				header={'Deaths'}
				color="rgba(255,0,0,.7)"
				stats={countryInfo.todayDeaths}
				total={countryInfo.deaths}
			/>
		</Grid>
	);
};

export default Cards;
