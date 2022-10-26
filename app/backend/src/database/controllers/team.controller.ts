import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamsController {
  constructor(private serviceTeam = new TeamService()) { }

  public getAll = async (_request: Request, response: Response): Promise<Response> => {
    const data = await this.serviceTeam.getAll();
    return response.status(200).json(data);
  };
}

export default TeamsController;
