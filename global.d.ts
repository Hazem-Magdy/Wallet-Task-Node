import { UtilService }  from "./services/Utilservice";

declare global {
    namespace Express {
      interface Request {
        user?: IUser; 
        userActions?: string[]; 
      }
    }
  }
var UtilService: UtilService;
