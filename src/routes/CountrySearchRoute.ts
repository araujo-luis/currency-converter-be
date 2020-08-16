import { Router } from 'express';
import * as CountryController from '../controllers/CountrySearchController';

const CountryRoute = Router();

CountryRoute.get('/:name', CountryController.findByName);

export default CountryRoute;