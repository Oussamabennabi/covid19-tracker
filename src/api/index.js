import axios from 'axios';

const URL = 'https://disease.sh/v3/covid-19/all';
const countrieURL = 'https://disease.sh/v3/covid-19/countries';
const chartURL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120';
export const fetchCountries = async () => {
	try {
		const {data} = await axios(countrieURL);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchCountryInfo = async (code) => {
	try {
		if (code === 'worldwide') {
			const {data} = await axios(URL)
			return data
		} else {
			const {data} = await axios(`${countrieURL}/${code}`)
			return data
		}
	} catch (error) {
		console.log(error)
	}
}

export const fetchChartData = async () => {
	try {
		const {data} = await axios(chartURL)

		return data
	} catch (error) {
		console.log(error)
	}
}