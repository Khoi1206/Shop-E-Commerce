import { useState } from "react";
import {
	AiOutlineHome,
	AiOutlineShopping,
	AiOutlineLogin,
	AiOutlineUserAdd,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/features/auth/authSlide";
// CSS
import "./Navigation.css";

const Navigation = () => {
	const { userInfo } = useSelector((state) => state.auth);
	// const { cartItems } = useSelector((state) => state.cart);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const [logoutApiCall] = useLogoutMutation();

	// const logoutHandler = async () => {
	// 	try {
	// 		await logoutApiCall().unwrap();
	// 		dispatch(logout());
	// 		navigate("/login");
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	return (
		<div
			style={{ zIndex: 9999 }}
			className={`${
				showSidebar ? "hidden" : "flex"
			} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] h-[100vh]  fixed`}
			id="navigation-container"
		>
			<div className="flex flex-col justify-center space-y-4">
				<Link
					to="/"
					className="flex items-center transition-transform transform hover:translate-x-2"
				>
					<AiOutlineHome className="mr-2 mt-[20px]" size={26} />
				</Link>
				<Link
					to="/shop"
					className="flex items-center transition-transform transform hover:translate-x-2"
				>
					<AiOutlineShopping className="mr-2 mt-[20px]" size={26} />
					<span className="hidden nav-item-name mt-[20px]">Shop</span>{" "}
				</Link>
				<Link
					to="/cart"
					className="flex items-center transition-transform transform hover:translate-x-2"
				>
					<AiOutlineShoppingCart className="mr-2 mt-[20px]" size={26} />
					<span className="hidden nav-item-name mt-[20px]">Cart</span>{" "}
				</Link>
				<Link
					to="/favorite"
					className="flex items-center transition-transform transform hover:translate-x-2"
				>
					<FaHeart className="mr-2 mt-[20px]" size={26} />
					<span className="hidden nav-item-name mt-[20px]">Favorites</span>{" "}
				</Link>
			</div>

			<div className="realtive">
				<button
					onClick={toggleDropdown}
					className="flex items-center text-gray-800 focus:outline-none"
				>
					{userInfo ? (
						<span className="text-white">{userInfo.username} </span>
					) : (
						<></>
					)}
				</button>
			</div>

			<ul className="mb-[20px]">
				<li>
					<Link
						to="/login"
						className="flex items-center transition-transform transform hover:translate-x-2"
					>
						<AiOutlineLogin className="mr-2 mt-[20px]" size={26} />
						<span className="hidden nav-item-name mt-[20px]">Login</span>{" "}
					</Link>
				</li>
				<li>
					<Link
						to="/register"
						className="flex items-center transition-transform transform hover:translate-x-2"
					>
						<AiOutlineUserAdd className="mr-2 mt-[20px]" size={26} />
						<span className="hidden nav-item-name mt-[20px]">
							Register
						</span>{" "}
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navigation;
