import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlide";
import { Link } from "react-router-dom";

import "../Auth/Style.css";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div id="profile-container">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3 rounded-2xl bg-transparent p-8 mt-[2rem]" id="profile-form">
          <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>
					<div className="border-t-2 border-white-200 h-0 my-2 overflow-hidden"></div>
          <form onSubmit={submitHandler}>
            <div className="mb-2">
              <label className="block text-white mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="mt-1 p-2 border rounded w-full bg-transparent text-white"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-white mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="mt-1 p-2 border rounded w-full bg-transparent text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-white mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="mt-1 p-2 border rounded w-full bg-transparent text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="mt-1 p-2 border rounded w-full bg-transparent text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 font-bold mr-[20px] rounded hover:bg-green-700"
              >
                {loadingUpdateProfile ? <Loader /> : "Update"}
              </button>

              <Link
                to="/user-orders"
                className="bg-blue-500 text-white py-2 px-4 font-bold rounded hover:bg-blue-700"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
