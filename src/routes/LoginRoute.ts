import { Router } from 'express';
import * as LoginController from '../controllers/LoginController';

const LoginRoute = Router();

LoginRoute.post('/', LoginController.login);

export default LoginRoute;