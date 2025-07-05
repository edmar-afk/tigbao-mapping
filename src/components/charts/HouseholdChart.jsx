import { useState, useEffect } from "react";import api from "../../assets/api";function HouseholdChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchHousehold = async () => {
			try {
				const response = await api.get(`/api/households/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching Households:", error);
				setData([]);
			}
		};

		fetchHousehold();
	}, []);

	return (
		<div className="flex flex-wrap justify-center gap-8 p-4">
			{data.length === 0 ? (
				<p className="text-center text-gray-500 italic">No household data available.</p>
			) : (
				data.map((household, index) => (
					<div
						key={index}
						className="max-w-2xl w-full sm:max-w-sm bg-white shadow-xl rounded-lg text-gray-900">
						<div className="rounded-t-lg h-32 overflow-hidden">
							<img
								className="object-contain w-full"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRha5kizWZgHqz4rmn_whIMB6xbqfCFG5wEpw&s"
								alt="Banner"
							/>
						</div>
						<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-pink-600 rounded-full overflow-hidden">
							<img
								className="object-cover object-center h-32"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Flag_of_Tigbao_ZDS.jpg/1200px-Flag_of_Tigbao_ZDS.jpg"
								alt="Avatar"
							/>
						</div>
						<div className="text-center mt-2">
							<h2 className="font-semibold">{household.family_name} Family</h2>
							<p className="text-gray-500">Tigbao Household</p>
						</div>

						{/* Household Table */}
						<div className="px-4 pb-6">
							{household.members && household.members.length > 0 ? (
								<div className="overflow-x-auto rounded-lg mt-4">
									<table className="min-w-full divide-y divide-pink-200 text-sm text-left">
										<thead className="bg-gray-100">
											<tr>
												<th className="px-4 py-2 text-gray-600">Name</th>
												<th className="px-4 py-2 text-gray-600">Age</th>
												<th className="px-4 py-2 text-gray-600">Role</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{household.members.map((member, i) => (
												<tr key={i}>
													<td className="px-4 py-2">{member.name}</td>
													<td className="px-4 py-2">{member.age}</td>
													<td className="px-4 py-2">{member.role}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<p className="text-center text-gray-500 italic mt-4">No family members found.</p>
							)}
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default HouseholdChart;
