import 'reflect-metadata';
import express from "express";
import { PORT } from "./config/enviroment";
import { Routes } from "./interfaces/Routes.interfaces";
import { UserRoutes } from "./routes/Users.routes";
import { createConnection } from 'typeorm';
import { myDataSource } from './database/conection';

class App {
    public app : express.Application;
    public port : string| number;
    
    constructor(routes: Routes[]){
        this.app = express();
        this.port = PORT || 3004

        this.initDBConnection()
        this.useRoutes(routes)
    }

    public listen(){
        this.app.listen(PORT, ()=>{
            console.log(
                `http://localhost:${this.port}`
            );
        })
    }

    private async initDBConnection(){
        try {
            let connect = await myDataSource.initialize()
            console.log(connect.isInitialized, 'conectado a la base de datos');
        } catch (error) {
            console.log(error);
        }
    }

    private useRoutes(routes: Routes[]){
        routes.forEach(route => {
            this.app.use('/', route.router)
        })
    }
}



const app = new App([new UserRoutes()])

app.listen()
