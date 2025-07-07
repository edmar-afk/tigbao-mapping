import { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Pwd from "./Pwd";
import Seniors from "./Seniors";
import Infrastructure from "./Infrastructures";
import Household from "./Household";
import HouseholdMembers from "./HouseholdMembers";

import HomeIcon from "@mui/icons-material/Home";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import ElderlyIcon from "@mui/icons-material/Elderly";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

function Admin() {
	const [activeTab, setActiveTab] = useState("dashboard");

	const navItems = [
		{ id: "dashboard", label: "Dashboard", icon: <HomeIcon fontSize="small" /> },
		{ id: "pwd", label: "PWD", icon: <WheelchairPickupIcon fontSize="small" /> },
		{ id: "seniors", label: "Seniors", icon: <ElderlyIcon fontSize="small" /> },
		{ id: "infras", label: "Infrastructure", icon: <ApartmentIcon fontSize="small" /> },
		{ id: "household", label: "Household", icon: <GroupsIcon fontSize="small" /> },
		{ id: "householdMembers", label: "Household Members", icon: <PersonIcon fontSize="small" /> },
	];

	return (
		<div className="flex">
			<nav className="bg-white shadow-md border-r border-gray-200 h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 overflow-auto">
				<div className="relative flex flex-col h-full">
					<div className="flex flex-wrap items-center cursor-pointer relative">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Flag_of_Tigbao_ZDS.jpg/1200px-Flag_of_Tigbao_ZDS.jpg"
							className="w-10 h-10 rounded-full object-cover"
							alt="Logo"
						/>
						<div className="ml-4">
							<p className="text-sm text-slate-900 font-medium">Admin Panel</p>
							<p className="text-xs text-slate-500 mt-0.5">Tigbao Barangay System</p>
						</div>
					</div>

					<hr className="my-6 border-gray-200" />

					<div>
						<h4 className="text-sm text-slate-500 mb-4">Modules</h4>
						<ul className="space-y-4 px-2 flex-1">
							{navItems.map(({ id, label, icon }) => (
								<li key={id}>
									<button
										onClick={() => setActiveTab(id)}
										className={`text-sm flex items-center font-medium transition-all w-full ${
											activeTab === id ? "text-blue-600" : "text-slate-800 hover:text-blue-600"
										}`}>
										<span className="w-5 h-5 mr-3">{icon}</span>
										<span>{label}</span>
									</button>
								</li>
							))}
						</ul>
					</div>

					<hr className="my-6 border-gray-200" />

					<div className="mt-auto">
						<ul className="space-y-4 px-2">
							<li>
								<Link
									to="/"
									className="text-slate-800 text-sm flex items-center font-medium hover:text-blue-600 transition-all">
									<LogoutIcon
										fontSize="small"
										className="w-4 h-4 mr-3"
									/>
									<span>Logout</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<main className="ml-[250px] flex-1 p-6">
				{activeTab === "dashboard" && <Dashboard />}
				{activeTab === "pwd" && <Pwd />}
				{activeTab === "seniors" && <Seniors />}
				{activeTab === "infras" && <Infrastructure />}
				{activeTab === "household" && <Household />}
				{activeTab === "householdMembers" && <HouseholdMembers />}
			</main>
		</div>
	);
}

export default Admin;
