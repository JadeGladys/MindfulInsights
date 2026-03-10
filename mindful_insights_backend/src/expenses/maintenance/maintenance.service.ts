import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MaintenanceExpense } from './maintenanceExpense.entity';
import { Repository } from "typeorm";
import { NewMaintenanceRecordDto } from "../input/record-maintenance.dto";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { ResearchService } from "src/vehicle/research.service";
import { SparePartService } from "../spareparts/sparepart.service";

@Injectable()
export class MaintenanceService{
    constructor(
        // @InjectRepository(Vehicle)
        // private readonly vehicleRepo: Repository<Vehicle>,
        @InjectRepository(MaintenanceExpense)
        private readonly maintenanceRepo: Repository<MaintenanceExpense>,
        private readonly vehicleService: ResearchService,
        private readonly sparePartService: SparePartService
    ){}

    private getMaintenanceBaseQuery(){
        return this.maintenanceRepo
            .createQueryBuilder('m')
            .orderBy('m.MaintenanceExpense_ID','ASC');
    }

    //record Insurance
    public async recordInsurance(input:NewMaintenanceRecordDto, user:Researcher): Promise<MaintenanceExpense>{
        const vehicle = await this.vehicleService.getVehicleByRegistrationNo(input.VIN);
        if (!vehicle) {
        throw new NotFoundException(`Vehicle with registration number ${input.VIN} not found`);
        }
        const sparePart = await this.sparePartService.getSparePartByPartName(input.partName);
        if (!sparePart) {
        throw new NotFoundException(`Spare-part ${input.partName} not found`);
        }

        const maintenance = this.maintenanceRepo.create({
            ...input,
            SparePart: sparePart,
            vehicle: vehicle,
            recordedBy: user
          });
        
          const savedMaintencance = await this.maintenanceRepo.save(maintenance);
          return savedMaintencance;
    }

    //get all Expenses
    async getAllMaintenanceExpenses(): Promise<MaintenanceExpense[]> {
        const queryBuilder = this.getMaintenanceBaseQuery();
        return await queryBuilder.getMany();
    }

    //get one Expenses
    public async getMaintenanceExpenseById(MaintenanceExpense_ID: number): Promise<MaintenanceExpense> {
        const queryBuilder = this.getMaintenanceBaseQuery();
        queryBuilder.where('m.MaintenanceExpense_ID = :MaintenanceExpense_ID', { MaintenanceExpense_ID });
        return await queryBuilder.getOne();
    }

    //pagination
    public async paginate(page = 1): Promise<any> {
        const take = 1;
        const [MaintenanceExpense, total] = await this.maintenanceRepo.findAndCount({
            take,
            skip: (page - 1) * take
        });
        return{
            data: MaintenanceExpense,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }
}