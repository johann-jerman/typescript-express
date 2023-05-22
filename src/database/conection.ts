import { DataSource, ConnectOptions } from "typeorm"
import { MYSQL_DB, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_TYPE, MYSQL_USER,  } from "../config/enviroment";
import { join } from "path";
import { Users } from "./entity/User.entity";


export const myDataSource = new DataSource({
    type: "mysql",
    host: MYSQL_HOST,
    port: 3306,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB,
    // entities: [join(__dirname, './**/*.entity{.ts,.js}')],
    entities: [Users],
})