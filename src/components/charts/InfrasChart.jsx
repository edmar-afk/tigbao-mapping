import { useState, useEffect } from "react";
import api from "../../assets/api";

function InfrasChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchInfras = async () => {
			try {
				const response = await api.get(`/api/infras/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching infrastructures:", error);
				setData([]);
			}
		};

		fetchInfras();
	}, []);

	const defaultImage = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a";

	return (
		<div className="flex flex-col items-center mt-10">
			{data.map((infra, index) => (
				<div
					key={index}
					className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm border-1 border-gray-200 rounded overflow-hidden shadow-lg my-4">
					<div className="py-4 px-8">
						<a href="#">
							<h4 className="text-lg mb-3 font-semibold">{infra.name}</h4>
						</a>
						<p className="mb-2 text-sm text-gray-600">{infra.description || "No description provided."}</p>
						<img
							src={infra.image || defaultImage}
							alt={infra.name}
							className="w-100"
						/>
						<hr className="mt-4" />
						<span className="text-xs">Tigbao</span>
						&nbsp;<span className="text-xs text-gray-500">Zamboanga del Sur</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default InfrasChart;
