import * as Jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IAuthorization } from '../interfaces/IAuthorization';
import { JwtUser } from '../interfaces/IToken';
import UserService from '../services/user.service';

const SECRET = process.env.JWT_SECRET;

class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public login = async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;
    const token = await this.userService.login(email, password);
    return response.status(200).json({ token });
  };

  public validate = async (request: Request, response: Response): Promise<Response> => {
    const { authorization } = request.headers as IAuthorization;
    const auth = authorization.replace('Bearer ', '');
    const verifyToken = Jwt.verify(auth as string, SECRET as string);
    const role = await this.userService.validate(verifyToken as JwtUser);
    return response.status(200).json({ role });
  };
}

export default UserController;
