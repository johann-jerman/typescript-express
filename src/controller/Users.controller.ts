import { Request, Response } from "express";
import { UserServise } from "../services/User.servises";
import { UserInterface } from "../interfaces/User.interfaces";
import { Users } from "../database/entity/User.entity";
import { Exeptions } from "../exceptions/Exeptions";
import { db } from "../database/conection";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { TOKEN_KEY } from "../config/enviroment";

export class UserController{

    public getAll = async ( req: Request, res: Response ): Promise<void> => {
        try {
            const users = await UserServise.findAllUsers()

            res.json({
                users
            })
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    }

    public getByPk = async ( req: Request, res: Response):Promise<void> => {
        try {
            let { id } = req.params
            const user = await UserServise.findByPkUser(Number(id))
            if(!user) throw new Exeptions('usuario no encontrado', 400)

            res.json({
                user
            })
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    } 

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const userInt: UserInterface = {
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            }
            const user = await UserServise.createOneUser(userInt)        
            res.json({
                user
            })
        } catch (error) {
            console.log(error);
            res.json(error)  
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            let validUser = await db.manager.findOne(Users, { where: {email : req.body.email}})
            
            if(!validUser) throw new Exeptions('usuraio no registrado', 404);

            let validPassword = await compare(req.body.password, validUser.password)

            if(!validPassword) throw new Exeptions('la contraseña no es valida', 404)

            let token = sign( String(validUser.id), String(TOKEN_KEY))

            res.status(200).json({
                token
            })
        } catch (error) {
            console.log(error);
            res.json(error)  
        }
    }

    public update = async (req: Request, res: Response): Promise<void> => {
        try {
            let {id} = req.params
            let data = {
                ...req.body
            }
            
            const userUpdated = await UserServise.updateOneUser( Number(id), data )

            res.status(200).json({
                data: userUpdated
            })
        } catch (error) {
            console.log(error);
            res.json(error)  
        }

    }

    public delete = async (req: Request, res: Response): Promise<void> => {
        try {
            await UserServise.deleteOneUser( Number(req.params.id))
            res.status(200).json({
                data: 'user deleted'
            })
        } catch (error) {
            console.log(error);
            res.json(error)  
        }
    }
}