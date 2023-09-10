import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import UserRepository from '../repositories/UserRepository '
const authService = new AuthService();
const userRepository = new UserRepository();

async function login(req: Request, res: Response) {
  try {
    const { mobile, password } = req.body;

    const token = await authService.loginUser(mobile, password);

    if (token) {
      return res.status(200).json({
        IsPass: true,
        Data: { token },
        Message: "Token created successfully.",
      });
    } else {
      return res.status(400).json({
        IsPass: false,
        Message: "Invalid login credentials.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      IsPass: false,
      Message: "An error occurred.",
    });
  }
}

async function register(req: Request, res: Response) {
  try {
    const { name, mobile, password } = req.body;

    //check dublicated mobile number
    const existUser = await userRepository.getUserByMobileAsync(mobile);

    if(existUser){
      return res.status(400).json({
        IsPass: false,
        Message: "Mobile number is already registered.",
      });
    }

    const registrationSuccess = await authService.registerUser(name, mobile, password);

    if (registrationSuccess) {
      return res.status(200).json({
        IsPass: true,
        Message: "Account created successfully.",
        Data: `Account created successfully at ${new Date().toISOString()}`,
      });
    } else {
      return res.status(500).json({
        IsPass: false,
        Message: "Failed to create an account.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      IsPass: false,
      Message: "An error occurred.",
    });
  }
  
}

export { login, register };
 
