import jwt, { Secret } from 'jsonwebtoken';
import { users } from '../utils/variables';
import { JWT_SECRET } from "../utils/variables";

export const authenticate = async (username: string, password: string) => {

    const user = users.find((user) => user.username === username && user.password === password);

    if (!user) throw new Error('Invalid user or password. Please try again');

    const secret: Secret = JWT_SECRET || 'secret';
    const token = jwt.sign({ user }, secret, { expiresIn: '7d' });
    
    return token;

}