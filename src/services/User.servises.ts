import { Repository } from "typeorm";
import { Users } from "../database/entity/User.entity";
import { UserUpdateInt } from "../interfaces/User.interfaces";
import { db } from "../database/conection";
import { Exeptions } from "../exceptions/Exeptions";
import { hash } from "bcrypt";


export class UserServise extends Repository<Users>{

    public static findAllUsers = async (): Promise<Users[]> => {
            const users= await db.manager.find(Users)
            return users
    }

    public static findByPkUser = async (id: number): Promise<Users> => {
        const user = await db.manager.findOne(Users, {
            where:{
                id
            }
        })

        if(!user) throw new Exeptions('ususario no encontrado', 404)

        return user
    } 

    public static createOneUser = async (userInt: any): Promise<Users> => {
        const userRepository = db.getRepository(Users);
        
        const users = new Users();
        
        users.email = userInt.email;
        users.password = await hash(userInt.password, 10);
        users.name = userInt.name;
        users.lastname = userInt.lastname
        
        return userRepository.save(users);
    }

    public static updateOneUser = async (id: number, data: UserUpdateInt) => {
        const userRepository = 
            await db.createQueryBuilder()
                .update(Users)
                .set(data)
                .where( "id = :id" ,{id})
                .execute()

        return userRepository
    }

    public static deleteOneUser = async (id: number) => {
        const userRepository = db.getRepository(Users);
        const userDeleted = await userRepository.softDelete(id);
        return userDeleted
    }
}