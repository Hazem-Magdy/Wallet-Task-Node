import { UtilService }  from "./services/Utilservice";

declare global {
    namespace Express {
      interface Request {
        user?: IUser; 
        userRoles?: string[]; 
      }
    }
  }
var UtilService: UtilService;
