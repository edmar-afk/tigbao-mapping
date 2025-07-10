import { useEffect, useState } from "react";import api from "../assets/api";import AddMembers from "../components/admin/AddMembers";
function HouseholdMembers() {
	const [households, setHouseholds] = useState([]);

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	return (
		<section className="w-full p-4">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddMembers />
				<p
					onClick={fetchHouseholds}
					className="cursor-pointer text-orange-600 hover:underline">
					Refresh
				</p>
			</div>

			<h1 className="mb-6 text-xl font-bold">List of Household Members</h1>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{households.length > 0 ? (
					households.map((household) => (
						<div
							key={household.id}
							className="bg-white border border-orange-200 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
							<h2 className="text-lg font-semibold text-gray-800 mb-4">
								{household.members.length > 0 && household.members[0].role} Member/s of {household.family_name} Family
							</h2>
							{household.members.length > 0 ? (
								<ul className="space-y-3">
									{household.members.map((member) => (
										<li
											key={member.id}
											className="text-sm text-gray-700 border-b border-gray-200 pb-2">
											<p className="font-medium">{member.name}</p>
											<p className="text-xs text-gray-600">Age: {member.age}</p>
											<p className="text-xs text-gray-600">Status: {member.status}</p>
											<p className="text-xs text-gray-600">Purok: {member.purok}</p>
											<p className="text-xs text-gray-600">Role: {member.role}</p>
										</li>
									))}
								</ul>
							) : (
								<p className="text-gray-400 italic">No members listed.</p>
							)}
						</div>
					))
				) : (
					<p className="text-center text-gray-500 col-span-full">No household members found.</p>
				)}
			</div>
		</section>
	);
}

export default HouseholdMembers;
