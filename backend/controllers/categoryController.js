import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

const categoryController = {
	// [Post] /
	createCategory: asyncHandler(async (req, res) => {
		try {
			const { name } = req.body;

			if (!name) {
				return res.json({ error: "Name is required" });
			}

			const existingCategory = await Category.findOne({ name });

			if (existingCategory) {
				return res.json({ error: "Already exists" });
			}

			const category = await new Category({ name }).save();
			res.json(category);
		} catch (error) {
			return res.status(400).json(error);
		}
	}),

	// [Put] /:categoryId
	updateCategory: asyncHandler(async (req, res) => {
		try {
			const { name } = req.body;
			const { categoryId } = req.params;

			const category = await Category.findOne({ _id: categoryId });

			if (!category) {
				return res.status(404).json({ error: "Category not found" });
			}

			category.name = name;

			const updatedCategory = await category.save();
			res.json(updatedCategory);
		} catch (error) {
			res.status(500).json({ error: "Internal server error" });
		}
	}),

	// [Delete] /:categoryId
	removeCategory: asyncHandler(async (req, res) => {
		try {
			const category = await Category.findById(req.params.categoryId);
			await Category.deleteOne({ _id: category._id });
			res.json({ message: "Category removed" });
		} catch (error) {
			res.status(500).json({ error: "Internal server error" });
		}
	}),

	// [Get] /categories
	listCategory: asyncHandler(async (req, res) => {
		try {
			const all = await Category.find({});
			res.json(all);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}),

	// [Get] /:id
	readCategory: asyncHandler(async (req, res) => {
		try {
			const category = await Category.findOne({ _id: req.params.id });
			res.json(category);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}),
};

export default categoryController;
