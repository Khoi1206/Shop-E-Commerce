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

import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlide";
// CSS
import "./Style.css";

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

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};

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

			<div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white mb-[20px] text-[10px] hover:text-[14px] rounded-full border-white p-[5px] ml-[-6.5px] border-2">{userInfo.username}</span>
          ) : (
            <></>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute space-y-2 bg-white text-gray-600 py-2 mb-[20px] rounded-lg ${
              !userInfo.isAdmin ? "top-[-5rem] right-[90px]" : "top-[-15rem] right-[60px]"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 hover:bg-gray-200"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 hover:bg-gray-200"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 hover:bg-gray-200"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 hover:bg-gray-200"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 hover:bg-gray-200">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 text-left hover:bg-gray-200 border-t-2 border-white-200 overflow-hidden"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul className="mb-[20px]">
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
		</div>
	);
};

export default Navigation;
