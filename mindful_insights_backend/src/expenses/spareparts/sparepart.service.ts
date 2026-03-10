import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SpareParts } from "./spareParts.entity";
import { Repository } from "typeorm";
import { NewSparePartRecordDto } from "../input/record-sparepart.dto";
import { Researcher } from "src/Users/researcher/researcher.entity";

@Injectable()
export class SparePartService{
    constructor(
        @InjectRepository(SpareParts)
        private readonly sparePartsRepo: Repository<SpareParts>
    ){}

    private getSparePartsBaseQuery(){
        return this.sparePartsRepo
            .createQueryBuilder('s')
            .orderBy('s.sparepart_ID','ASC');
    }

    //record vehicles
    public async recordSparePart(input:NewSparePartRecordDto, user:Researcher): Promise<SpareParts>{
        const sparePart = this.sparePartsRepo.create({
            ...input,
            recordedBy: user
          });
        
          const savedSparepart = await this.sparePartsRepo.save(sparePart);
          return savedSparepart;
    }

    //getSparePartByPartName
    public async getSparePartByPartName(PartName: string): Promise<SpareParts> {
        const queryBuilder = this.getSparePartsBaseQuery();
        queryBuilder.where('s.PartName = :PartName', { PartName });
        return await queryBuilder.getOne();
    }
}