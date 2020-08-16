
import { Router } from 'express';
import CountryRoute from './CountrySearchRoute';

const router = Router();

router.use('/search', CountryRoute);


export default router;