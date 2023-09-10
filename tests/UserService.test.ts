import { expect } from 'chai';
const sinon = require("sinon");
import UserService from '../services/AuthService';


describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    
  });
  
  it('should register a new user', async () => {
    sinon.stub(userService , "registerUser").returns(true)
    const result = await userService.registerUser('zzzzz', '01007756572', '0502349611@Hossam');
    expect(result).to.be.true;
  });

  it('should not register a user with existing mobile', async () => {
    sinon.stub(userService , "registerUser").returns(false)
    const result = await userService.registerUser('Dina', '01009756572', '0502349611@Dina');
    expect(result).to.be.false;
  });

  it('should login a user with correct credentials', async () => {
    sinon.stub(userService , "loginUser").returns(String)
    const token = await userService.loginUser('01009756572', '0502349611@Hazem');
    expect(token).to.be.a('string');
  });

  it('should not login a user with incorrect credentials', async () => {
    sinon.stub(userService , "loginUser").returns(null)
    const token = await userService.loginUser('01009751572', '0502349611@Zoz');
    expect(token).to.be.null;
  });
});

