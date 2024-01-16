import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlide";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();

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
		try {
		  const res = await login({ email, password }).unwrap();
		  dispatch(setCredentials({ ...res }));
		  navigate(redirect);
		} catch (err) {
		  toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div id="login-container">
			<section className="pl-[38rem] flex flex-wrap">
				<div
					className="mt-[10rem] p-8 rounded-2xl bg-transparent"
					id="login-form"
				>
					<form onSubmit={submitHandler} className="container w-[20rem] h-[14rem]">
						<div>
							<input
								type="email"
								id="email"
								className="mt-1 p-2 border rounded w-full bg-transparent text-white"
								placeholder="Enter Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="my-[1rem]">
							<input
								type="password"
								id="password"
								className="mt-1 p-2 border rounded w-full bg-transparent text-white"
								placeholder="Enter Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							disabled={isLoading}
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded cursor-pointer font-bold w-full mb-[5px]"
						>
							{isLoading ? <Loader />: "Sign In"}
						</button>
						<div className="border-t-2 border-white-200 h-0 my-2 overflow-hidden"></div>
						<div className="bg-green-500 hover:bg-green-700 text-white py-2 rounded cursor-pointer w-[15rem] my-[1rem] mx-auto font-bold text-center">
							<Link to="/register">Register</Link>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
};

export default Login;
