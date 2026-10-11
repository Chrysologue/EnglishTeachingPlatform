import type { User } from "./user";

declare global { //The declarations inside this block should affect the global type environment
  namespace Express { // Express organizes some of its type definitions under a namespace named Express
    interface Request {
      user?: User;
    }
  }
}

export {}; 
//It means there are no specific values or types being exported, but marks the file as a module
//The declare global syntax is intended to make declarations available in the global type environment.
// TypeScript requires it to be used inside a module


