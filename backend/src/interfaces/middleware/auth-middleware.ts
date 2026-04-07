

import type { Request, Response, NextFunction } from "express";



export interface IAuthMiddleware {
  validtateToken(req: Request, res: Response, next: NextFunction): Promise<void>
}
