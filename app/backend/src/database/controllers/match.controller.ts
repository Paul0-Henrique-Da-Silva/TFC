import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  constructor(private serviceMatch = new MatchService()) { }

  public getAll = async (_request: Request, response: Response): Promise<Response> => {
    const data = await this.serviceMatch.getAll();
    return response.status(200).json(data);
  };

  public getMatchesByProgress = async (request: Request, response: Response): Promise<Response> => {
    const { inProgress } = request.query;
    if (inProgress !== 'true' && inProgress !== 'false') {
      return this.getAll(request, response);
    }
    const filtered = await this.serviceMatch.getProgressFilter(inProgress === 'true');
    return response.status(200).json(filtered);
  };
}

export default MatchController;
