
import { Router } from 'express';
import CountryRoute from './CountrySearchRoute';
import LoginRoute from './LoginRoute';
import { verifyToken } from '../middlewares/VerifyLoginToken';
import { requestLimiter } from '../middlewares/RequestLimit';

const router = Router();

router.use('/search', verifyToken, requestLimiter, CountryRoute);
router.use('/login', LoginRoute);

export default router;