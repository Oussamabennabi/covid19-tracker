import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchCountryInfo } from './api';

import styles from './App.module.css';
import { Cards, Header, Map, Table } from './components';

function App() {
	const [selectedCountrie, setSelectedCountrie] = useState('worldwide');
	const [countries, setCountries] = useState([]);
const [countryInfo, setCountryInfo] = useState({});
const [mapPosition, setMapPosition] = useState([34.80746, -40.4796]);
const [mapZoom, setMapZoom] = useState(3);
const [caseType,setCaseType] = useState('cases')
useEffect(() => {
	const fetchAPI = async () => {
		const data = await fetchCountryInfo(selectedCountrie);
		const modifiedCountry = {
			todayCases: data.todayCases,
			todayDeaths: data.todayDeaths,
			todayRecovered: data.todayRecovered,
			cases: data.cases,
			deaths: data.deaths,
			recovered: data.recovered,
			lat:data.countryInfo.lat,
			long:data.countryInfo.long
		};
		setCountryInfo(modifiedCountry);
		setMapPosition([modifiedCountry.lat, modifiedCountry.long]);
		setMapZoom(5)
	};
	fetchAPI();
}, [selectedCountrie]);
	useEffect(() => {
		const fetchAPI = async () => {
			const countriesData = await fetchCountries();

			const modifiedContries = countriesData.map((country) => ({
				name: country.country,
				isoValue: country.countryInfo.iso2,
				cases: country.cases,
				recovered: country.recovered,
				deaths: country.deaths,
				lat: country.countryInfo.lat,
				long: country.countryInfo.long,
				flag:country.countryInfo.flag
			})); 
			setCountries(modifiedContries);
      
		};
		fetchAPI();
	}, []);
	return (
		<div className={styles.app}>
			<Header
				setSelectedCountrie={setSelectedCountrie}
				countries={countries}
				selectedCountrie={selectedCountrie}
			/>
			<Cards
				caseType={caseType}
				setCaseType={setCaseType}
				countryInfo={countryInfo}
				selectedCountrie={selectedCountrie}
			/>
			<Map
				caseType={caseType}
				countries={countries}
				position={mapPosition}
				zoom={mapZoom}
			/>
			<Table caseType={caseType} countries={countries} />
		</div>
	);
}

export default App;
