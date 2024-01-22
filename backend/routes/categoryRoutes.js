import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import categoryController from "../controllers/categoryController.js";

const router = express.Router();

router
	.route("/")
	.post(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		categoryController.createCategory
	);

router
	.route("/:categoryId")
	.put(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		categoryController.updateCategory
	);

router
	.route("/:categoryId")
	.delete(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		categoryController.removeCategory
	);

router.route("/categories").get(categoryController.listCategory);
router.route("/:id").get(categoryController.readCategory);

export default router;
