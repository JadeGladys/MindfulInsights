import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { MainModule } from './module/overall.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [ormConfig]
  }),
  TypeOrmModule.forRootAsync({
    //useClass: DatabaseConnectionService,
    useFactory: process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd
  }),
  MainModule
],
  controllers: [],
  providers: [
],
})
export class AppModule {}
