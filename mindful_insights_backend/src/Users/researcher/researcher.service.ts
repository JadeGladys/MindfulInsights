import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Researcher } from "./researcher.entity";
import { UserResponseDto } from "src/auth/input/userResponse.dto";
import { AnalystResponseDto } from "src/auth/input/role-analyst.dto";

@Injectable()
export class ResearcherService{
    constructor(
        @InjectRepository(Researcher)
        private readonly researcherRepo: Repository<Researcher>,
    ){}

    private getResearchersBaseQuery(){
        return this.researcherRepo
            .createQueryBuilder('v')
            .orderBy('v.userID','ASC');
    }

    //getResearcheByID
    public async getResearcherByUserID(userID: string): Promise<Researcher> {
        const queryBuilder = this.getResearchersBaseQuery();
        queryBuilder.where('v.userID = :userID', { userID });
        return await queryBuilder.getOne();
    }

    //find analysts
    public async getAnalyst(): Promise<Researcher[]> {
        const queryBuilder = this.researcherRepo.createQueryBuilder('user');
        queryBuilder.leftJoinAndSelect('user.roles', 'role');
        queryBuilder.where('role.name = :role', { role: 'analyst' });
        return await queryBuilder.getMany();
      }
    
      public async getAnalystAsResponseDto(): Promise<AnalystResponseDto[]> {
        const analysts = await this.getAnalyst();
        return analysts.map(analyst => ({
          id: analyst.id,
          userID: analyst.userID,
          username: analyst.username,
          email: analyst.email,
          roles: analyst.roles.map(role => role.name),
        }));
      }

    //find hod
    public async getHod(): Promise<Researcher[]> {
      const queryBuilder = this.researcherRepo.createQueryBuilder('user');
      queryBuilder.leftJoinAndSelect('user.roles', 'role');
      queryBuilder.where('role.name = :role', { role: 'hod' });
      return await queryBuilder.getMany();
    }
  
      public async getHodAsResponseDto(): Promise<AnalystResponseDto[]> {
        const hods = await this.getHod();
        return hods.map(hod => ({
          id: hod.id,
          userID: hod.userID,
          username: hod.username,
          email: hod.email,
          roles: hod.roles.map(role => role.name),
        }));
      }  

    

    // //record vehicles
    // // public async recordVehicle(input:NewResearcherRecordDto, user:Researcher): Promise<Research>{
    // //     const vehicle = this.vehicleRepo.create({
    // //         ...input,
    // //         recordedBy: user
    // //       });
        
    // //       const savedVehicle = await this.vehicleRepo.save(vehicle);
    // //       return savedVehicle;
    // // }

    // //get all vehicles
    // async getAllVehicles(): Promise<Research[]> {
    //     const queryBuilder = this.getVehiclesBaseQuery();
    //     return await queryBuilder.getMany();
    // }

    // //get one vehicle
    // public async getVehicleById(vehicle_ID: number): Promise<Research> {
    //     const queryBuilder = this.getVehiclesBaseQuery();
    //     queryBuilder.where('v.vehicle_ID = :vehicle_ID', { vehicle_ID });
    //     return await queryBuilder.getOne();
    // }

    

    //update vehicle info
    // public async updateVehicle(vehicle: Research, input: UpdateResearchDto): Promise<Research>{
    //     const updatedVehicle = await this.vehicleRepo.save({
    //         ...vehicle,
    //         ...input
    //       });
        
    //     return this.getVehicleById(updatedVehicle.research_ID);
    // }

    // //pagination
    // public async paginate(page = 1): Promise<any> {
    //     const take = 1;
    //     const [Vehicle, total] = await this.vehicleRepo.findAndCount({
    //         take,
    //         skip: (page - 1) * take
    //     });
    //     return{
    //         data: Vehicle,
    //         meta: {
    //             total,
    //             page,
    //             last_page: Math.ceil(total / take)
    //         }
    //     }
    // }
}