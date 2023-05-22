import { Request, Response, NextFunction } from "express";
import { Users } from "../database/entity/User.entity";
import { myDataSource } from "../database/conection";

export class UserController{

    public getAll = async ( req: Request, res: Response ) => {
        try {
            
            const users= await myDataSource.manager.find(Users)
            res.json({
                users
            })
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    }

}