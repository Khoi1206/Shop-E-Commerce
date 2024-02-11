import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
	useDeleteUserMutation,
	useGetUsersQuery,
	useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
// ⚠️⚠️⚠️ don't forget this ⚠️⚠️⚠️⚠️
import AdminMenu from "./AdminMenu";

import "../Auth/Style.css";

const UserList = () => {
	const { data: users, refetch, isLoading, error } = useGetUsersQuery();

	const [deleteUser] = useDeleteUserMutation();

	const [editableUserId, setEditableUserId] = useState(null);
	const [editableUserName, setEditableUserName] = useState("");
	const [editableUserEmail, setEditableUserEmail] = useState("");

	const [updateUser] = useUpdateUserMutation();

	useEffect(() => {
		refetch();
	}, [refetch]);

	const deleteHandler = async (id) => {
		if (window.confirm("Are you sure")) {
			try {
				await deleteUser(id);
				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	const toggleEdit = (id, username, email) => {
		setEditableUserId(id);
		setEditableUserName(username);
		setEditableUserEmail(email);
	};

	const updateHandler = async (id) => {
		try {
			await updateUser({
				userId: id,
				username: editableUserName,
				email: editableUserEmail,
			});
			setEditableUserId(null);
			refetch();
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div id="userlist-container">
			<div className="p-4 pl-[14rem]">
				<h1 className="text-2xl font-semibold mb-4">Users</h1>
				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">
						{error?.data?.message || error.error}
					</Message>
				) : (
					<div className="flex flex-col md:flex-row">
						<AdminMenu />
						<table className="w-full md:w-4/5 table-auto border-collapse">
							<thead>
								<tr className="text-center border-slate-300">
									<th className="border px-4 py-2">#</th>
									<th className="border px-4 py-2">ID</th>
									<th className="border px-4 py-2">NAME</th>
									<th className="border px-4 py-2">EMAIL</th>
									<th className="border px-4 py-2">ADMIN</th>
									<th className="border px-4 py-2"></th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, index) => (
									<tr className="border-slate-300" key={user._id}>
										<td className="px-4 py-2 border text-center">
											{index + 1}
										</td>
										<td className="px-4 py-2 border">{user._id}</td>
										<td className="px-4 py-2 border">
											{editableUserId === user._id ? (
												<div className="flex items-center">
													<input
														type="text"
														value={editableUserName}
														onChange={(e) =>
															setEditableUserName(e.target.value)
														}
														className="w-full p-2 border rounded-lg"
													/>
													<button
														onClick={() => updateHandler(user._id)}
														className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
													>
														<FaCheck />
													</button>
												</div>
											) : (
												<div className="flex items-center">
													{user.username}{" "}
													<button
														onClick={() =>
															toggleEdit(user._id, user.username, user.email)
														}
													>
														<FaEdit className="ml-[1rem]" />
													</button>
												</div>
											)}
										</td>
										<td className="px-4 py-2 border">
											{editableUserId === user._id ? (
												<div className="flex items-center">
													<input
														type="text"
														value={editableUserEmail}
														onChange={(e) =>
															setEditableUserEmail(e.target.value)
														}
														className="w-full p-2 border rounded-lg"
													/>
													<button
														onClick={() => updateHandler(user._id)}
														className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
													>
														<FaCheck />
													</button>
												</div>
											) : (
												<div className="flex items-center">
													<a href={`mailto:${user.email}`}>{user.email}</a>{" "}
													<button
														onClick={() =>
															toggleEdit(user._id, user.name, user.email)
														}
													>
														<FaEdit className="ml-[1rem]" />
													</button>
												</div>
											)}
										</td>
										<td className="px-4 py-2 border">
											<div className="flex justify-center">
												{user.isAdmin ? (
													<FaCheck style={{ color: "green" }} />
												) : (
													<FaTimes style={{ color: "red" }} />
												)}
											</div>
										</td>
										<td className="px-4 py-2 border">
											{!user.isAdmin && (
												<div className="flex justify-center">
													<button
														onClick={() => deleteHandler(user._id)}
														className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
													>
														<FaTrash />
													</button>
												</div>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserList;
