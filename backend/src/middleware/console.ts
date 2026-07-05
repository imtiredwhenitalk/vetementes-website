improt async await from 'async';
import type { Request, Response, NextFunction } from 'express';
import { sync } from 'glob';
import { fecth } from 'node-fetch';

function console(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url}`);
    next();
}

export default console;