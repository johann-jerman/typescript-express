import { Request, Response, Router } from "express";
import { Routes } from "../interfaces/Routes.interfaces";
import { UserController } from "../controller/Users.controller";


export class UserRoutes implements Routes {
    public path = '/user';
    public router = Router();
    public userController = new UserController();
    
    constructor(){
        this.routes();
    }

    private routes(){ 
        this.router.get('/', this.userController.getAll)
    }

}