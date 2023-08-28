import { expect } from 'chai';
import UserService from '../services/AuthService';


describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it('should register a new user', async () => {
    const result = await userService.registerUser('hossam', '01007756572', '0502349611@Hossam', 'User');
    expect(result).to.be.true;
  });

  it('should not register a user with existing mobile', async () => {
    const result = await userService.registerUser('Dina', '01009756572', '0502349611@Dina', 'User');
    expect(result).to.be.false;
  });

  it('should login a user with correct credentials', async () => {
    const token = await userService.loginUser('01009756572', '0502349611@Hazem');
    expect(token).to.be.a('string');
  });

  it('should not login a user with incorrect credentials', async () => {
    const token = await userService.loginUser('01009751572', '0502349611@Zoz');
    expect(token).to.be.null;
  });
});

