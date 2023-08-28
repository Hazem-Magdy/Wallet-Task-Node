import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

const authService = new AuthService();

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
    const { name, mobile, password, role } = req.body;

    const registrationSuccess = await authService.registerUser(name, mobile, password, role);

    if (registrationSuccess) {
      return res.status(200).json({
        IsPass: true,
        Message: "Account created successfully.",
        Data: `Account created successfully at ${new Date().toISOString()}`,
      });
    } else {
      return res.status(400).json({
        IsPass: false,
        Message: "Mobile number is already registered.",
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
