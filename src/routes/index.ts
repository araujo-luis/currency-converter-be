
import { Router } from 'express';
import CountryRoute from './CountrySearchRoute';
import LoginRoute from './LoginRoute';
import { verifyToken } from '../middlewares/VerifyLoginToken';

const router = Router();

router.use('/search', verifyToken, CountryRoute);
router.use('/login', LoginRoute);

export default router;