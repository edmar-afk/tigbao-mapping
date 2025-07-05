import React, { useState } from "react";import { Modal, Box, Button, TextField, Tooltip, IconButton, Typography } from "@mui/material";
import api from "../assets/api";
import ChatIcon from "@mui/icons-material/Chat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const feedbackStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

function FeedBack({ lat, lng }) {
	const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
	const [loginModalOpen, setLoginModalOpen] = useState(false);
	const [name, setName] = useState("");
	const [feedback, setFeedback] = useState("");
	const [copied, setCopied] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleFeedbackOpen = () => setFeedbackModalOpen(true);
	const handleFeedbackClose = () => setFeedbackModalOpen(false);

	const handleLoginOpen = () => setLoginModalOpen(true);
	const handleLoginClose = () => setLoginModalOpen(false);

	const handleFeedbackSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/api/feedback/submit/", { name, feedback });
			setName("");
			setFeedback("");
			handleFeedbackClose();
		} catch (err) {
			handleFeedbackClose();
			console.error(err);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(`${lat}, ${lng}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "admin123") {
			setError("");
			handleLoginClose();
			navigate("/admin");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<>
			<div className="fixed top-34 left-4 z-[99999] flex flex-col w-fit gap-2">
				<Tooltip
					title="Send Feedback"
					placement="right"
					componentsProps={{
						popper: {
							sx: { "& .MuiTooltip-tooltip": { bgcolor: "white", color: "black", boxShadow: 1, fontWeight: "bold" } },
						},
					}}>
					<IconButton
						onClick={handleFeedbackOpen}
						className="!bg-yellow-600 hover:!bg-yellow-700 text-white shadow !rounded-full p-3">
						<ChatIcon />
					</IconButton>
				</Tooltip>

				<Tooltip
					title={copied ? "Copied!" : "Copy Location"}
					placement="right"
					componentsProps={{
						popper: {
							sx: { "& .MuiTooltip-tooltip": { bgcolor: "white", color: "black", boxShadow: 1, fontWeight: "bold" } },
						},
					}}>
					<IconButton
						onClick={handleCopy}
						className="!bg-yellow-100 text-yellow-800 border border-yellow-600 hover:!bg-yellow-200 !rounded-full p-3">
						<ContentCopyIcon />
					</IconButton>
				</Tooltip>

				<Tooltip
					title="Login"
					placement="right"
					componentsProps={{
						popper: {
							sx: { "& .MuiTooltip-tooltip": { bgcolor: "white", color: "black", boxShadow: 1, fontWeight: "bold" } },
						},
					}}>
					<IconButton
						onClick={handleLoginOpen}
						className="!bg-white shadow !rounded-full p-3">
						<DashboardIcon />
					</IconButton>
				</Tooltip>
			</div>

			{/* Feedback Modal */}
			<Modal
				open={feedbackModalOpen}
				onClose={handleFeedbackClose}>
				<Box sx={feedbackStyle}>
					<form onSubmit={handleFeedbackSubmit}>
						<TextField
							fullWidth
							label="Your Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							label="Your Feedback"
							multiline
							rows={4}
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							required
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 2, borderRadius: 10 }}>
							Submit your Feedback
						</Button>
					</form>
				</Box>
			</Modal>

			{/* Login Modal */}
			<Modal
				open={loginModalOpen}
				onClose={handleLoginClose}>
				<Box className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl mt-24 z-[99999]">
					<div
						className="hidden lg:block lg:w-1/2 bg-cover"
						style={{
							backgroundImage: `url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80')`,
						}}
					/>
					<div className="w-full p-8 lg:w-1/2">
						
						<form onSubmit={handleLogin}>
							<div className="mt-4">
								<label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
								<TextField
									fullWidth
									variant="outlined"
									size="small"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="mt-4">
								<div className="flex justify-between">
									<label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
									
								</div>
								<TextField
									fullWidth
									variant="outlined"
									size="small"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
							<div className="mt-8">
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ backgroundColor: "#374151", "&:hover": { backgroundColor: "#1f2937" } }}>
									Login
								</Button>
							</div>
						</form>
						
					</div>
				</Box>
			</Modal>
		</>
	);
}

export default FeedBack;
