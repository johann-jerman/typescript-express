import 'reflect-metadata';
import express from "express";
import { CORS_ORIGIN, PORT } from "./config/enviroment";
import { Routes } from "./interfaces/Routes.interfaces";
import { db } from './database/conection';
import cors from "cors";

export class App {
    public app : express.Application;
    public port : string| number;
    
    constructor(routes: Routes[]){
        this.app = express();
        this.port = PORT || 3004

        this.initDBConnection()
        this.initMiddleware()
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
            let connect = await db.initialize()
            
            if(connect) console.log('conectado a la base de datos');
            if(!connect) throw new Error('no se puedo conectar a la base de datos')
            
        } catch (error) {
            console.log(error);
        }
    }

    private initMiddleware(){
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json())
        this.app.use(cors({
            origin: CORS_ORIGIN,
        }))
    }

    private useRoutes(routes: Routes[]){
        routes.forEach(route => {
            this.app.use('/', route.router)
        })
    }
}
