import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Admin from "./routes/Admin";
import LoginPage from "./components/admin/Login";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/admin"
					element={<Admin />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>

				<Route
					path="*"
					element={<Navigate to="/" />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
