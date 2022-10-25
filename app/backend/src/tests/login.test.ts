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
  email: 'ph46163835@gmail.com',
  password: bcrypt.hashSync('Alg-Cost-Salt-Hash'),
};


describe('', () => {
  it('"POST/login" Sem a senha, mensagem de erro com status 400', async () => {
    const response = await chai.request(app).post('/login')
    .send({
      email: 'any_email@gmail.com',
      password: ''
    });
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    expect(response.status).to.be.equal(400);
  });
});

describe('', () => {
  it('"POST/login" Sem o email, mensagem de erro com status 400', async () => {
    const response = await chai.request(app).post('/login')
    .send({
        email: '',
        password: 'password_invalid'
      });
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    expect(response.status).to.be.equal(400);
  });
});

describe('', () => { 
  beforeEach(() => {
    sinon.stub(UserModel, 'findOne').resolves(validoUser as UserModel)
  });
  afterEach(() => {(UserModel.findOne as sinon.SinonStub).restore()});
  
  it('"POST/login" token JWT com status 200', async () => {
    const response = await chai.request(app)
    .post('/login').send({
      email: 'benignotatto@gmail.com',
      password: 'Alg-Cost-Salt-Hash'
    })
    expect(response.body).to.have.property('token');
    expect(response.status).to.be.equal(200);
  })
})

    
describe('', () => {
  beforeEach(() => {
    sinon.stub(UserModel, 'findOne').resolves(null as unknown as UserModel);
  });
  afterEach(() => { (UserModel.findOne as sinon.SinonStub).restore()});

  it('"POST/login", Usuario inválido, mensagem de erro com status 401', async () => {
    const response = await chai.request(app).post('/login')
    .send({
      email: 'email_invalid@gmail.com',
      password: 'password_invalid'
    });
    expect(response.status).to.be.equal(401);
  });

});

    
