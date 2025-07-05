import AccessibleIcon from "@mui/icons-material/Accessible";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ElderlyIcon from "@mui/icons-material/Elderly";
import HouseIcon from "@mui/icons-material/House";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";
import { Link } from "react-router-dom";

function TopBar({ isVisible, onCategorySelect }) {
	const categories = [
		{ label: "PWD", key: "pwds", icon: <AccessibleIcon fontSize="small" /> },
		{ label: "Infrastructure", key: "infras", icon: <ApartmentIcon fontSize="small" /> },
		{ label: "Senior Citizens", key: "seniors", icon: <ElderlyIcon fontSize="small" /> },
		{ label: "Households", key: "households", icon: <HouseIcon fontSize="small" /> },
		{ label: "Feedbacks", key: "feedbacks", icon: <PeopleIcon fontSize="small" /> },
	];

	return (
		<div
			className={`bg-white fixed bottom-4 left-4 w-[600px] rounded-xl z-[999] transition-transform duration-300 ${
				isVisible ? "translate-y-0" : "translate-y-full"
			}`}>
			<div className="flex flex-row flex-wrap items-center justify-center gap-4 p-4">
				{categories.map((cat) => (
					<div
						key={cat.key}
						className="flex flex-col items-center w-20">
						<button
							onClick={() => onCategorySelect(cat.key)}
							className={`p-3 rounded-full transform transition-transform duration-300 hover:scale-125 cursor-pointer `}>
							{cat.icon}
						</button>
						<span className="text-xs mt-1 text-center">{cat.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default TopBar;
