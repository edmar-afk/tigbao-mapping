import React, { useEffect, useState } from "react";import api from "../assets/api";import AddSeniors from "../components/admin/AddSeniors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Seniors() {
	const [seniors, setSeniors] = useState([]);

	const fetchSeniors = async () => {
		try {
			const res = await api.get("/api/seniors/");
			setSeniors(res.data);
		} catch (err) {
			console.error("Failed to fetch Seniors:", err);
		}
	};

	const deleteSenior = async (id) => {
		try {
			await api.delete(`/api/seniors/${id}/`);
			setSeniors((prev) => prev.filter((s) => s.id !== id));
		} catch (err) {
			console.error("Failed to delete Senior:", err);
		}
	};

	useEffect(() => {
		fetchSeniors();
	}, []);

	return (
		<section className="w-full p-4">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddSeniors />
				<p
					onClick={fetchSeniors}
					className="cursor-pointer text-orange-600 hover:underline">
					Refresh
				</p>
			</div>

			<h1 className="mb-6 text-xl font-bold">List of Seniors</h1>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{seniors.length > 0 ? (
					seniors.map((senior) => (
						<div
							key={senior.id}
							className="bg-white border border-orange-200 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
							<h2 className="text-lg font-semibold text-gray-800 mb-2">{senior.people}</h2>
							<div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
								<p>Age: {senior.age}</p>
								<p>Gender: {senior.gender}</p>
								<p>Status: {senior.status}</p>
								<p>Purok: {senior.purok}</p>
							</div>
							<button
								type="button"
								onClick={() => deleteSenior(senior.id)}
								className="text-red-600 hover:underline flex items-center space-x-1">
								<DeleteForeverIcon fontSize="small" />
								<span>Delete</span>
							</button>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 col-span-full">No Senior records found.</p>
				)}
			</div>
		</section>
	);
}

export default Seniors;
