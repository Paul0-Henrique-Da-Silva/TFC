import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) { }
  public login = async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;
    const token = await this.userService.login(email, password);
    return response.status(200).json({ token });
  };
}

export default UserController;
