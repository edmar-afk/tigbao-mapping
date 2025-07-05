import { useEffect, useState } from "react";import api from "../assets/api";
import AddInfrastructures from "../components/admin/AddInfrastructures";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Infrastructure() {
	const [infras, setInfras] = useState([]);

	const fetchInfras = async () => {
		try {
			const res = await api.get("/api/infras/");
			setInfras(res.data);
		} catch (err) {
			console.error("Failed to fetch Infrastructures:", err);
		}
	};

	const deleteInfra = async (id) => {
		try {
			await api.delete(`/api/infrastructure/delete/${id}/`);
			setInfras((prev) => prev.filter((i) => i.id !== id));
		} catch (err) {
			console.error("Failed to delete Infrastructure:", err);
		}
	};

	useEffect(() => {
		fetchInfras();
	}, []);

	return (
		<section className="w-full p-4">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddInfrastructures />
				<p
					onClick={fetchInfras}
					className="cursor-pointer text-orange-600 hover:underline">
					Refresh
				</p>
			</div>

			<h1 className="mb-6 text-xl font-bold">List of Infrastructures</h1>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{infras.length > 0 ? (
					infras.map((infra) => (
						<div
							key={infra.id}
							className="bg-white border border-orange-200 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
							<div className="mb-4">
								{infra.image ? (
									<img
										src={infra.image}
										alt="infra"
										className="w-full h-40 object-cover rounded"
									/>
								) : (
									<div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 italic rounded">
										No Image
									</div>
								)}
							</div>
							<h2 className="text-lg font-semibold text-gray-800 mb-1">{infra.name}</h2>
							<p className="text-sm text-gray-600 mb-1">Type: {infra.type}</p>
							<p className="text-sm text-gray-600 mb-4">
								{infra.description?.length > 100
									? infra.description.slice(0, 100) + "..."
									: infra.description || "No description"}
							</p>
							<button
								type="button"
								onClick={() => deleteInfra(infra.id)}
								className="text-red-600 hover:underline flex items-center space-x-1">
								<DeleteForeverIcon fontSize="small" />
								<span>Delete</span>
							</button>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 col-span-full">No infrastructure records found.</p>
				)}
			</div>
		</section>
	);
}

export default Infrastructure;
