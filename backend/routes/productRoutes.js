import express from "express";
import formidable from "express-formidable";

import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

router
	.route("/")
	.get(productController.fetchProducts)
	.post(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		formidable(),
		productController.addProduct
	);

router.route("/allproducts").get(productController.fetchAllProducts);
router
	.route("/:id/reviews")
	.post(
		authMiddleware.authenticate,
		checkId,
		productController.addProductReview
	);

router.get("/top", productController.fetchTopProducts);
router.get("/new", productController.fetchNewProducts);

router
	.route("/:id")
	.get(productController.fetchProductById)
	.put(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		formidable(),
		productController.updateProductDetails
	)
	.delete(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		productController.removeProduct
	);

router.route("/filtered-products").post(productController.filterProducts);

export default router;
