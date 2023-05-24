import { Router } from "express";
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
        this.router.get(`${this.path}`, this.userController.getAll)
        this.router.get(`${this.path}/:id`, this.userController.getByPk)

        this.router.post(`${this.path}/register`, this.userController.register)
        this.router.post(`${this.path}/login`, this.userController.login)
        
        this.router.put(`${this.path}/update/:id`, this.userController.update)
        this.router.delete(`${this.path}/delete/:id`, this.userController.delete)
    }
}