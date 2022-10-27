import IMatch from '../interfaces/IMatch';
import MatchModel from '../models/MatchModel.ts';
import Team from '../models/TeamsModel';

class MatchService {
  private modelMacth = MatchModel;
  async getAll(): Promise<IMatch[]> {
    const data = await this.modelMacth.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, {
        model: Team, as: 'teamAway', attributes: ['teamName'],
      }],
    });
    return data as IMatch[];
  }

  async getProgressFilter(inProgress: boolean): Promise<IMatch[]> {
    const match = await this.modelMacth.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, {
        model: Team, as: 'teamAway', attributes: ['teamName'],
      }],
      where: { inProgress },
    });
    return match as IMatch[];
  }

  public async finish(id: string): Promise<IMatch | null> {
    const data = await this.modelMacth.findByPk(id);
    if (!data) return null;

    const finish = await data.update({ inProgress: false });
    return finish;
  }

  public async addNew(newMatch: object): Promise<IMatch> {
    const data = await this.modelMacth.create(newMatch);
    return data as IMatch;
  }
}

export default MatchService;
