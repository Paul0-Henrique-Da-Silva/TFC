import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router:Router = Router();

const userController = new UserController();

router.post('/', userController.login);

export default router;
