import { useState } from "react";import { Link } from "react-router-dom";
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
			<nav className="bg-white shadow-md border-r border-gray-200 h-screen fixed top-0 left-0 w-20 py-6 px-2">
				<div className="flex flex-col items-center h-full space-y-6">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Flag_of_Tigbao_ZDS.jpg/1200px-Flag_of_Tigbao_ZDS.jpg"
						className="w-10 h-10 rounded-full object-cover"
						alt="Logo"
					/>

					<div className="flex-1 flex flex-col items-center space-y-4 mt-6">
						{navItems.map(({ id, label, icon }) => (
							<button
								key={id}
								onClick={() => setActiveTab(id)}
								className={`relative group pt-2 pb-4 px-3 rounded-full transition-all ${
									activeTab === id ? "bg-orange-600 text-white" : "hover:bg-orange-400 hover:text-white text-gray-700"
								}`}>
								<div className="w-5 h-5">{icon}</div>
								<span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
									{label}
								</span>
							</button>
						))}
					</div>

					<div className="mt-auto mb-4">
						<Link
							to="/"
							className="relative group p-3 rounded-full hover:bg-orange-400 hover:text-white text-gray-700 transition-all">
							<LogoutIcon fontSize="small" />
							<span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
								Logout
							</span>
						</Link>
					</div>
				</div>
			</nav>

			<main className="ml-20 flex-1 p-6">
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
