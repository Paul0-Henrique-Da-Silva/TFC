import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router:Router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);

export default router;
