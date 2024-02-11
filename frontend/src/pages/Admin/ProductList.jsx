import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useCreateProductMutation,
	useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [quantity, setQuantity] = useState("");
	const [brand, setBrand] = useState("");
	const [stock, setStock] = useState(0);
	const [imageUrl, setImageUrl] = useState(null);

	const navigate = useNavigate();

	const [uploadProductImage] = useUploadProductImageMutation();
	const [createProduct] = useCreateProductMutation();
	const { data: categories } = useFetchCategoriesQuery();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const productData = new FormData();
			productData.append("image", image);
			productData.append("name", name);
			productData.append("description", description);
			productData.append("price", price);
			productData.append("category", category);
			productData.append("quantity", quantity);
			productData.append("brand", brand);
			productData.append("countInStock", stock);

			const { data } = await createProduct(productData);

			if (data.error) {
				toast.error("Product create failed. Try Again.");
			} else {
				toast.success(`${data.name} is created`);
				navigate("/");
			}
		} catch (error) {
			console.error(error);
			toast.error("Product create failed. Try Again.");
		}
	};

	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);

		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success(res.message);
			setImage(res.image);
			setImageUrl(res.image);
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<div className="container xl:mx-[13rem] sm:mx-[0]">
			<div className="flex flex-col md:flex-row">
				<AdminMenu />
				<div className="md:w-3/4 p-3">
					<h2 className="text-2xl font-bold text-center mb-4">
						Create Product
					</h2>
					<div className="border-t-2 border-white-200 h-0 my-2 overflow-hidden w-[97%] mb-5"></div>

					<div className="flex flex-wrap mb-3 mr-[33px]">
						<div className="one">
							{imageUrl && (
								<div className="text-center">
									<img
										src={imageUrl}
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
							<div className="two ml-10 ">
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
									className="p-2 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>
							<div className="two ml-10 ">
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
						></textarea>

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
								className="mb-[10px] bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-700 font-semibold focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50"
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
