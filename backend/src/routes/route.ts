import express from "express";
import AuthController from "../controllers/AuthController";
import { validateUser } from "../middleware/authenticate";
import MessageController from "../controllers/MessageController";
import UserController from "../controllers/UserController";

const router = express.Router();
/**
 * Authentication routes
 */
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get('/auth/me', validateUser, AuthController.me);
router.get('/auth/logout', validateUser, AuthController.logout);

/**
 * Message routes
 */
router.get('/message', validateUser, MessageController.getAllMessage);
router.get('/message/:id', validateUser, MessageController.getMessage);
router.get('/message/:id/read', validateUser, MessageController.readMessage);
router.get('/message/:id/delete', validateUser, MessageController.deleteMessage);
router.post('/message', validateUser, MessageController.createMessage);

/**
 * User routes
 */
router.get('/users', validateUser, UserController.getAllUsers);

export default router;
