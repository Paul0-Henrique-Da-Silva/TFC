import TeamModel from '../models/TeamsModel';
import { ITeam } from '../interfaces/ITeam';

class TeamService {
  private modelTeam = TeamModel;

  public async getAll(): Promise<ITeam[]> {
    const data = await this.modelTeam.findAll();

    return data;
  }
}

export default TeamService;
