import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useUpdateProductMutation,
	useDeleteProductMutation,
	useGetProductByIdQuery,
	useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

import AdminMenu from "./AdminMenu";

const AdminProductUpdate = () => {
	const params = useParams();

	const { data: productData } = useGetProductByIdQuery(params._id);

	console.log(productData);

	const [image, setImage] = useState(productData?.image || "");
	const [name, setName] = useState(productData?.name || "");
	const [description, setDescription] = useState(
		productData?.description || ""
	);
	const [price, setPrice] = useState(productData?.price || "");
	const [category, setCategory] = useState(productData?.category || "");
	const [quantity, setQuantity] = useState(productData?.quantity || "");
	const [brand, setBrand] = useState(productData?.brand || "");
	const [stock, setStock] = useState(productData?.countInStock);

	// hook
	const navigate = useNavigate();

	// Fetch categories using RTK Query
	const { data: categories = [] } = useFetchCategoriesQuery();

	const [uploadProductImage] = useUploadProductImageMutation();

	// Define the update product mutation
	const [updateProduct] = useUpdateProductMutation();

	// Define the delete product mutation
	const [deleteProduct] = useDeleteProductMutation();

	useEffect(() => {
		if (productData && productData._id) {
			setName(productData.name);
			setDescription(productData.description);
			setPrice(productData.price);
			setCategory(productData.category?._id);
			setQuantity(productData.quantity);
			setBrand(productData.brand);
			setImage(productData.image);
		}
	}, [productData]);

	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success("Item added successfully", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
			setImage(res.image);
		} catch (err) {
			toast.success("Item added successfully", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append("image", image);
			formData.append("name", name);
			formData.append("description", description);
			formData.append("price", price);
			formData.append("category", category);
			formData.append("quantity", quantity);
			formData.append("brand", brand);
			formData.append("countInStock", stock);

			// Update product using the RTK Query mutation
			const data = await updateProduct({ productId: params._id, formData });

			if (data?.error) {
				toast.error(data.error, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			} else {
				toast.success(`Product successfully updated`, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
				navigate("/admin/allproductslist");
			}
		} catch (err) {
			console.log(err);
			toast.error("Product update failed. Try again.", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
		}
	};

	const handleDelete = async () => {
		try {
			let answer = window.confirm(
				"Are you sure you want to delete this product?"
			);
			if (!answer) return;

			const { data } = await deleteProduct(params._id);
			toast.success(`"${data.name}" is deleted`, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
			navigate("/admin/allproductslist");
		} catch (err) {
			console.log(err);
			toast.error("Delete failed. Try again.", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
		}
	};

	return (
		<>
			<div className="container  xl:mx-[13rem] sm:mx-[0]">
				<div className="flex flex-col md:flex-row">
					<AdminMenu />
					<div className="md:w-3/4 p-3">
						<h2 className="text-2xl font-bold text-center mb-4">
							Update / Delete Product
						</h2>
						<div className="border-t-2 border-white-200 h-0 my-2 overflow-hidden w-[97%] mb-5"></div>

						<div className="flex flex-wrap mb-3 mr-[33px]">
							<div className="one">
								{image && (
									<div className="text-center">
										<img
											src={image}
											alt="product"
											className="max-h-[50px] pr-[41px]"
										/>
									</div>
								)}
							</div>
							<div className="two">
								<label className="border text-white p-3 block w-full text-center rounded-lg cursor-pointer font-bold ">
									{image ? image.name : "Upload Image"}

									<input
										type="file"
										name="image"
										accept="image/*"
										onChange={uploadFileHandler}
										className={!image ? "hidden" : "text-white"}
									/>
								</label>
							</div>
						</div>

						<div>
							<div className="flex flex-wrap">
								<div className="one">
									<label htmlFor="name">Name</label> <br />
									<input
										type="text"
										className="p-2 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div className="two ml-10">
									<label htmlFor="name block">Price</label> <br />
									<input
										type="number"
										className="p-2 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
							</div>

							<div className="flex flex-wrap">
								<div className="one">
									<label htmlFor="name block">Quantity</label> <br />
									<input
										type="number"
										min="1"
										className="p-2 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
										value={quantity}
										onChange={(e) => setQuantity(e.target.value)}
									/>
								</div>
								<div className="two ml-10">
									<label htmlFor="name block">Brand</label> <br />
									<input
										type="text"
										className="p-2 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
										value={brand}
										onChange={(e) => setBrand(e.target.value)}
									/>
								</div>
							</div>

							<label htmlFor="" className="my-5">
								Description
							</label>
							<textarea
								type="text"
								className="p-2 mb-3 bg-[#101011] border rounded-lg w-[97%] text-white"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>

							<div className="flex flex-wrap">
								<div className="one">
									<label htmlFor="name block">Count In Stock</label> <br />
									<input
										type="text"
										className="p-2 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
										value={stock}
										onChange={(e) => setStock(e.target.value)}
									/>
								</div>

								<div className="two ml-10">
									<label htmlFor="">Category</label> <br />
									<select
										placeholder="Choose Category"
										className="p-2 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
										onChange={(e) => setCategory(e.target.value)}
									>
										{categories?.map((c) => (
											<option key={c._id} value={c._id}>
												{c.name}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="flex justify-end w-[97%] mt-5">
								<button
									onClick={handleSubmit}
									className="mb-[10px] bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 font-semibold focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50 mr-5"
								>
									Update
								</button>
								<button
									onClick={handleDelete}
									className="mb-[10px] bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 font-semibold focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminProductUpdate;
