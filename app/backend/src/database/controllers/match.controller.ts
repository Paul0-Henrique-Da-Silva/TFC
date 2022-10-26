import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  constructor(private serviceMatch = new MatchService()) { }

  public getAll = async (_request: Request, response: Response): Promise<Response> => {
    const data = await this.serviceMatch.getAll();

    return response.status(200).json(data);
  };
}

export default MatchController;
