import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import api from "../../assets/api";

function PwdCharts() {
	const [genderCounts, setGenderCounts] = useState({ Male: 0, Female: 0 });
	const [ageGroupsData, setAgeGroupsData] = useState({});

	useEffect(() => {
		const fetchPwds = async () => {
			try {
				const response = await api.get("/api/pwds/");
				const data = response.data;

				let male = 0;
				let female = 0;

				const ageGroups = {
					"0-10": 0,
					"11-20": 0,
					"21-30": 0,
					"31-40": 0,
					"41-50": 0,
					"51-60": 0,
					"61-70": 0,
					"71-80": 0,
					"81+": 0,
				};

				data.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (gender === "Male") male++;
					else if (gender === "Female") female++;

					if (!isNaN(age)) {
						if (age <= 10) ageGroups["0-10"]++;
						else if (age <= 20) ageGroups["11-20"]++;
						else if (age <= 30) ageGroups["21-30"]++;
						else if (age <= 40) ageGroups["31-40"]++;
						else if (age <= 50) ageGroups["41-50"]++;
						else if (age <= 60) ageGroups["51-60"]++;
						else if (age <= 70) ageGroups["61-70"]++;
						else if (age <= 80) ageGroups["71-80"]++;
						else ageGroups["81+"]++;
					}
				});

				setGenderCounts({ Male: male, Female: female });
				setAgeGroupsData(ageGroups);
			} catch (error) {
				console.error("Error fetching PWDs:", error);
			}
		};

		fetchPwds();
	}, []);

	const donutBaseOptions = {
		chart: {
			toolbar: {
				show: true,
				tools: {
					download: true, // enables built-in download (PNG, SVG, CSV)
					selection: false,
					zoom: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false,
					customIcons: [],
				},
			},
		},
		plotOptions: {
			pie: {
				startAngle: -90,
				endAngle: 90,
				offsetY: 10,
			},
		},
		grid: {
			padding: { bottom: -100 },
		},
		legend: {
			position: "right",
			offsetY: 20,
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: { width: 200 },
					legend: { position: "bottom" },
				},
			},
		],
	};

	const genderLabels = ["Male", "Female"];
	const genderSeries = [genderCounts.Male, genderCounts.Female];

	const ageLabels = Object.keys(ageGroupsData);
	const ageSeries = Object.values(ageGroupsData);

	return (
		<div className="pt-4">
			<p className="text-center font-bold mb-8">PWD Demographics</p>

			<div className="flex flex-col justify-center gap-8">
				<div className="w-full">
					<p className="text-left mb-2 font-semibold">By Gender</p>
					<Chart
						options={{ ...donutBaseOptions, labels: genderLabels }}
						series={genderSeries}
						type="donut"
						height={300}
					/>
				</div>

				<div className="w-full">
					<p className="text-left mb-2 font-semibold">By Age Group</p>
					<Chart
						options={{ ...donutBaseOptions, labels: ageLabels }}
						series={ageSeries}
						type="donut"
						height={300}
					/>
				</div>
			</div>
		</div>
	);
}

export default PwdCharts;
