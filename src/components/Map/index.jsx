
import React, { memo} from 'react'
import styles from './map.module.css'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import {Circle,Popup} from 'react-leaflet'
import numeral from 'numeral'
const circleRadius = {
	cases: 800,
	recovered: 1200,
	deaths: 2000,
};
const Map = memo(({ countries,caseType, position, zoom }) => {

function ChangeMap({ position, zoom }) {
	const map = useMap();
	map.panTo(position);
	return null;
	} 
	
	//DROW CIRCLES :
	const showDataOnMap = (data, caseType)=> (
		data.map((country, i) => {

			return (
				<Circle
					key={i}
					fillColor={
						(caseType === 'cases' || caseType === 'deaths')
							? 'rgba(255,0,0,0.5)'
							: 'rgba(0,255,0,0.5)'
					}
					center={[country.lat, country.long]}
					fillOpacity={0.4}
					radius={Math.sqrt(country[caseType]) * circleRadius[caseType]}
				>
					<Popup>
						<div>
							<img style={{borderRadius:"5px"}} src={country.flag} alt={country.name} width="100%" />
							<div>{country.name}</div>
							<div>Cases: {numeral(country.cases).format('0,0')}</div>
							<div>Recovered: {numeral(country.recovered).format('0,0')}</div>
							<div>Deaths: {numeral(country.deaths).format('0,0')}</div>
						</div>
					</Popup>
				</Circle>
			);
		})
	)
  return (
		<div className={styles.container}>
			<MapContainer
				center={position}
				zoom={zoom}
				className={styles.mapContainer}
			>
				<ChangeMap position={position} zoom={zoom} />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{showDataOnMap(countries, caseType)}
			</MapContainer>
		</div>
	);
}, (prev, next) => {
  return prev.position === next.position && prev.zoom === next.zoom;
})

export default Map

