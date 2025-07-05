import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddHousehold from "../components/admin/AddHousehold";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Household() {
	const [households, setHouseholds] = useState([]);

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const deleteHousehold = async (id) => {
		try {
			await api.delete(`/api/households/delete/${id}/`);
			setHouseholds((prev) => prev.filter((h) => h.id !== id));
		} catch (err) {
			console.error("Failed to delete household:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	return (
		<section className="w-full p-4">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddHousehold />
				<p
					onClick={fetchHouseholds}
					className="cursor-pointer text-orange-600 hover:underline">
					Refresh
				</p>
			</div>

			<h1 className="mb-6 text-xl font-bold">List of Households</h1>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{households.length > 0 ? (
					households.map((household) => (
						<div
							key={household.id}
							className="bg-white border border-orange-200 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
							<h2 className="text-lg font-semibold text-gray-800 mb-4">{household.family_name} Family</h2>
							<button
								type="button"
								onClick={() => deleteHousehold(household.id)}
								className="text-red-600 hover:underline flex items-center space-x-1">
								<DeleteForeverIcon fontSize="small" />
								<span>Delete</span>
							</button>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 col-span-full">No household records found.</p>
				)}
			</div>
		</section>
	);
}

export default Household;
