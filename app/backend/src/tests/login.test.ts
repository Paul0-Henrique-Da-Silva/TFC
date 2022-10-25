import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UsersModel';
import * as bcrypt from 'bcryptjs';

// minha referencias em base de outro projetos..
// https://github.com/Paul0-Henrique-Da-Silva/node-api
// https://github.com/Paul0-Henrique-Da-Silva/ideas


chai.use(chaiHttp);
const { expect } = chai;

// mock
const validoUser = {
  email: 'benignotatto@gmail.com',
  password: bcrypt.hashSync('Alg-Cost-Salt-Hash'),
};

    describe('', () => {
      beforeEach(() => {
        sinon.stub(UserModel, 'findOne').resolves(validoUser as UserModel)
      });

      afterEach(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
      });

      it('"POST/login" token JWT com status 200', async () => {
        const response = await chai.request(app)
        .post('/login').send({
          email: 'emailTudoCertor@gmail.com',
          password: 'Alg-Cost-Salt-Hash'
        })
        expect(response.body).to.have.property('token');
        expect(response.status).to.be.equal(200);
      });
    });
