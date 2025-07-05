import { useState, useEffect } from "react";
import api from "../../assets/api";
import RefreshIcon from "@mui/icons-material/Refresh";

function FeedbackChart() {
	const [data, setData] = useState([]);

	const fetchFeedback = async () => {
		try {
			const response = await api.get(`/api/feedbacks/`);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching feedbacks:", error);
			setData([]);
		}
	};

	useEffect(() => {
		fetchFeedback();
	}, []);

	return (
		<div className="relative flex flex-col justify-center overflow-hidden px-4">
			<div
				className="text-right flex justify-end items-center space-x-1 text-blue-600 hover:underline cursor-pointer pr-2 pb-4"
				onClick={fetchFeedback}>
				<RefreshIcon fontSize="small" />
				<p>Refresh</p>
			</div>

			<section className="w-full rounded-lg border-2 border-purple-600 p-4 mx-auto max-w-xl">
				<h3 className="font-os text-lg font-bold">Comments</h3>

				{data.length > 0 ? (
					data.map((item, index) => (
						<div
							className="flex mt-4"
							key={index}>
							<div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center">
								<img
									className="h-12 w-12 rounded-full object-cover"
									src="https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg?w=360"
									alt=""
								/>
							</div>

							<div className="ml-3">
								<div className="font-bold text-purple-800">{item.name}</div>
								<div className="text-gray-600">Posted a Comment about Tigbao</div>
								<div className="mt-2 text-purple-800">{item.feedback}</div>
							</div>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 italic mt-4">No feedbacks found.</p>
				)}
			</section>
		</div>
	);
}

export default FeedbackChart;
