import React, { useState } from "react";import { useNavigate } from "react-router-dom";
import { Modal, Box, Button, TextField, Typography, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "admin123") {
			setError("");
			navigate("/admin");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}>
			<Box className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl mt-24">
				<div
					className="hidden lg:block lg:w-1/2 bg-cover"
					style={{
						backgroundImage:
							"url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
					}}
				/>
				<div className="w-full p-8 lg:w-1/2">
					<h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
					<p className="text-xl text-gray-600 text-center">Welcome back!</p>
					<Button
						variant="outlined"
						fullWidth
						className="flex items-center justify-center mt-4 rounded-lg shadow-md normal-case"
						startIcon={<GoogleIcon />}>
						<Typography className="text-gray-600 font-bold">Sign in with Google</Typography>
					</Button>

					<div className="mt-4 flex items-center justify-between">
						<span className="border-b w-1/5 lg:w-1/4"></span>
						<span className="text-xs text-center text-gray-500 uppercase">or login with email</span>
						<span className="border-b w-1/5 lg:w-1/4"></span>
					</div>

					<form onSubmit={handleLogin}>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
							<TextField
								fullWidth
								variant="outlined"
								size="small"
								type="email"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="mt-4">
							<div className="flex justify-between">
								<label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
								<a
									href="#"
									className="text-xs text-gray-500">
									Forget Password?
								</a>
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

					<div className="mt-4 flex items-center justify-between">
						<span className="border-b w-1/5 md:w-1/4"></span>
						<a
							href="#"
							className="text-xs text-gray-500 uppercase">
							or sign up
						</a>
						<span className="border-b w-1/5 md:w-1/4"></span>
					</div>
				</div>
			</Box>
		</Modal>
	);
}
