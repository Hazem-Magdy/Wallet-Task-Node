import { IUser } from '../Helpers/User-Interface';
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import  UserRepository from '../repositories/UserRepository ';
const { userModel } = require("../Helpers/DataBaseConnection");


const userRepository = new UserRepository();

class UserService {
  async registerUser(name: string, mobile: string, password: string, role: string): Promise<boolean> {
    try {
      const existingUser = await userRepository.getUserByMobileAsync(mobile);

      if (existingUser) {
        return false; 
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        mobile,
        password: hashedPassword,
        role,
        balance: 1000.0,
      };

      const createdUser = await userModel.create(newUser);

      return !!createdUser;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async loginUser(mobile: string, password: string): Promise<string | null> {
    try {
      const user = await userModel.findOne({ where: { mobile } });

      if (user && (await bcrypt.compare(password, user.password))) {

        const token = this.generateToken(user);
        return token;
      } else {
        return null; 
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  private generateToken(user: IUser): string {
    const secretKey = "blalalalalala658998989"; 

    const userClaims: any[] = [
        { name: "Id", value: user.id },
        { name: "jti", value: jwt.sign({ id: user.id }, secretKey) },
    ];

    if (user.role) {
      userClaims.push({ name: "role", value: user.role });
    }

    const token = jwt.sign({ claims: userClaims }, secretKey, {
      expiresIn: "8h",
    });

    return token;
  }
}

export default UserService;
