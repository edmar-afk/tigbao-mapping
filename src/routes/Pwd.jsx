import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddPwd from "../components/admin/AddPwd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Pwd() {
	const [pwds, setPwds] = useState([]);

	const fetchPwds = async () => {
		try {
			const res = await api.get("/api/pwds/");
			setPwds(res.data);
		} catch (err) {
			console.error("Failed to fetch PWDs:", err);
		}
	};

	const deletePwd = async (id) => {
		try {
			await api.delete(`/api/pwd/delete/${id}/`);
			setPwds((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error("Failed to delete PWD:", err);
		}
	};

	useEffect(() => {
		fetchPwds();
	}, []);

	return (
		<section className="w-full p-4">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddPwd />
				<p
					onClick={fetchPwds}
					className="cursor-pointer text-purple-600 hover:underline">
					Refresh
				</p>
			</div>

			<h1 className="mb-6 text-xl font-bold">List of PWDs</h1>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{pwds.length > 0 ? (
					pwds.map((pwd) => (
						<div
							key={pwd.id}
							className="bg-white border border-orange-200 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
							<h2 className="text-lg font-semibold text-gray-800 mb-2">{pwd.people}</h2>
							<p className="text-sm text-gray-600 mb-1">Age: {pwd.age}</p>
							<p className="text-sm text-gray-600 mb-4">Gender: {pwd.gender}</p>
							<button
								type="button"
								onClick={() => deletePwd(pwd.id)}
								className="text-red-600 hover:underline flex items-center space-x-1">
								<DeleteForeverIcon fontSize="small" />
								<span>Delete</span>
							</button>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 col-span-full">No PWD records found.</p>
				)}
			</div>
		</section>
	);
}

export default Pwd;
