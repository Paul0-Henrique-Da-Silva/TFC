import * as sinon from 'sinon';
import * as chai from 'chai';
import MatchModel from '../database/models/MatchModel.ts';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const matches = [
        {
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Grêmio"
          }
        },
        {
          "id": 41,
          "homeTeam": 16,
          "homeTeamGoals": 2,
          "awayTeam": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Internacional"
          }
        }
      ]

const { expect } = chai;

describe('', () => {
    beforeEach(() => {
    sinon.stub(MatchModel, 'findAll').resolves(matches as unknown as MatchModel[])
    });

    afterEach(() => (MatchModel.findAll as sinon.SinonStub).restore());

    it('"GET/matches" retorna todos match com o status 200', async () => {
    const response = await chai.request(app).get('/matches');

    expect(response.body).to.be.an('array');
    expect(response.status).to.be.equal(200);
    });
});
