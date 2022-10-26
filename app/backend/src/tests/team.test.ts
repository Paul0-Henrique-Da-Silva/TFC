import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/TeamsModel';

chai.use(chaiHttp);
const { expect } = chai;

// mocks
const teams = [
    { id: 1, teamName: 'Avaí/Kindermann'},
    { id: 2, teamName: 'Bahia'},
    { id: 3, teamName: 'Botafogo'},
  ]

    describe('', () => {
      beforeEach(() => {
        sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[])
      });
      afterEach(() => {
        (TeamModel.findAll as sinon.SinonStub).restore()});

      it('"GET /teams:" retorna todos teams com o status 200', async () => {
        const response = await chai.request(app).get('/teams');

        expect(response.body).to.be.deep.equal(teams);
        expect(response.status).to.be.equal(200);
      });
    });