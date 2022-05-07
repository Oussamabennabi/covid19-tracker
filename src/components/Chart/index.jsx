import React, { memo, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchChartData } from '../../api';
import styles from './chart.module.css';
import numeral from 'numeral'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const chartOptions = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: 'index',
		intersect: false,
		callbacks: {
			label: (tooltipItem, data) => {
				return numeral(tooltipItem.value).format('+0,0');
			},
		},
	},

	scales: {
	  xaxes: [
	    {
	      type: "time",
	      time: {
	        format: "MM/DD/YY",
	        tooltipFormat:"ll",
	      }
	    }
	  ],
	  yaxes: [

	    {
	      gridLines: {
	        display:false,
	      },
	      ticks: {
	        callback: (value,index,values) => {
	          return numeral(value).format("0a")
	        }
	      }
	    }
	  ]
	}
};
const Chart = memo(({caseType = "cases"}) => {
	const [chartData, setChartData] = useState([]);
	useEffect(() => {
		const fetchAPI = async () => {
			const data = await fetchChartData();
			setChartData(buildChartData(data, caseType));
		};
		fetchAPI();
	}, [caseType]);

	const buildChartData = (data,caseType) => {
		const chartData = [];
		let startPoint = 0;
			for (const date in data[caseType]) {
				if (startPoint) {
					const newData = {
						x: date,
						y: data[caseType][date] - startPoint,
					};
					chartData.push(newData);
				}
				startPoint = data[caseType][date];
			}
	return chartData
	};

	return (
		<div className={styles.container}>
			{chartData?.length > 0 && (
				<Line
					options={chartOptions}
					data={{
						datasets: [
							{
								label: `Total ${caseType}` ,
                data: chartData,
                fill: true,
								backgroundColor: 'rgba(204,16,52,0.5)',
								borderColor: '#CC1034',
							},
						],
						labels: [],
					}}
				/>
			)}
		</div>
	);
}, (prev,next) => {
	return prev.caseType === next.caseType;
});

export default Chart;
