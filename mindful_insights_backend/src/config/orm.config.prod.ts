import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from '../Users/researcher/profile.entity';
import { Researcher } from '../Users/researcher/researcher.entity';
import { Research } from 'src/vehicle/research.entity';
import { Analysis } from 'src/Analysis/analysis.entity';
import { Data } from 'src/vehicle/data/data.entity';
import { Role } from 'src/roles/role.entity';
import { MaintenanceExpense } from 'src/expenses/maintenance/maintenanceExpense.entity';
import { SpareParts } from 'src/expenses/spareparts/spareParts.entity';
import { PublicationRequest } from 'src/publicationrequest/publication-request.entity';


export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    entities: [   
      Researcher, 
      Research,
      Profile, 
      Research, 
      Analysis, 
      Data,
      Role,
      MaintenanceExpense,
      SpareParts,
      PublicationRequest,
    ],
    synchronize: false,
    //dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA))
  })
);