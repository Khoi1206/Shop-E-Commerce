import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlide";
import { toast } from "react-toastify";

import "./Style.css";

const Register = () => {
	const [username, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await register({ username, email, password }).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate(redirect);
				toast.success("User successfully registered");
			} catch (err) {
				console.log(err);
				toast.error(err.data.message);
			}
		}
	};

	return (
		<div id="register-container">
			<section className="pl-[38rem] flex flex-wrap">
				<div
					className="mt-[4rem] p-8 rounded-2xl bg-transparent"
					id="register-form"
				>
					<form
						onSubmit={submitHandler}
						className="container w-[20rem] h-[18rem]"
					>
						<div className="my-[1rem]">
							<input
								type="text"
								id="name"
								className="mt-1 p-2 border rounded w-full bg-transparent text-white"
								placeholder="Enter name"
								value={username}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="my-[1rem]">
							<input
								type="email"
								id="email"
								className="mt-1 p-2 border rounded w-full bg-transparent text-white"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="my-[1rem]">
							<input
								type="password"
								id="password"
								className="mt-1 p-2 border rounded w-full bg-transparent text-white"
								placeholder="Enter password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div className="my-[1rem]">
							<input
								type="password"
								id="confirmPassword"
								className="mt-1 p-2 border rounded w-full bg-transparent text-white"
								placeholder="Confirm password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>

						<button
							disabled={isLoading}
							type="submit"
							className="bg-green-500 hover:bg-green-700 text-white py-2 rounded cursor-pointer font-bold w-full mb-[5px]"
						>
							{isLoading ? <Loader /> : "Register"}
						</button>
					</form>
					<div className="border-t-2 border-white-200 h-0 my-2 overflow-hidden"></div>
					<div className="mt-4">
						<p className="text-white">
							Already have an account?{" "}
							<Link
								to={redirect ? `/login?redirect=${redirect}` : "/login"}
								className="text-blue-600 hover:text-blue-500 font-bold"
							>
								Login
							</Link>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Register;
