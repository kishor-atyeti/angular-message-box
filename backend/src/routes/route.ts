import express from "express";
import AuthController from "../controllers/AuthController";
import { validateUser } from "../middleware/authenticate";

const router = express.Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get('/auth/me', validateUser, AuthController.me);
router.get('/auth/logout', validateUser, AuthController.logout);

export default router;
