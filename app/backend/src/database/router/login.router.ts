import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Validation from '../middleware/loginValidations';

const router:Router = Router();

const userController = new UserController();
const validation = new Validation();

router.post('/', validation.requireLogin, userController.login);

export default router;
