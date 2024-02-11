import express from "express";

import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// /
router
	.route("/")
	.post(userController.registerUser)
	.get(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		userController.getAllUsers
	);

router.route("/logout").post(userController.logoutCurrentUser);

router.route("/auth").post(userController.loginUser);

router
	.route("/profile")
	.get(authMiddleware.authenticate, userController.getCurrentUserProfile)
	.put(authMiddleware.authenticate, userController.updateCurrentUserProfile);

// ADMIN ROUTES
router
	.route("/:id")
	.delete(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		userController.deleteUserById
	)
	.get(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		userController.getUserById
	)
	.put(
		authMiddleware.authenticate,
		authMiddleware.authorizeAdmin,
		userController.updateUserById
	);

export default router;
