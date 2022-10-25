import * as Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '.';
import { IUser } from '../interfaces/IUser';

const jwt = (user: IUser) => {
  const token = Jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '3600' },
  );

  return token;
};

export default jwt;
