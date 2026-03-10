import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
// import { Event } from "./events/event.entity";
// import { Attendee } from './events/attendee.entity';
import { Injectable } from "@nestjs/common";
// import { Teacher } from "./school/teacher.entity";
// import { Subject } from './school/subject.entity';


@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      name: "default",
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      dropSchema: false,
      logging: false,
      entities: [],
    };
  }
}
