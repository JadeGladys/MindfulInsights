import { Injectable, NotFoundException } from '@nestjs/common';
import { Data } from './data.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordDataDto} from '../input/record-data.dto';
import { ResearchService } from '../research.service';
import { UpdateDataDto } from '../input/update-data.dto';
import { Researcher } from 'src/Users/researcher/researcher.entity';
import { Research } from '../research.entity';

@Injectable()
export class DataService{
    constructor(
        @InjectRepository(Data)
        private readonly DataRepo: Repository<Data>,
        private readonly researchService: ResearchService,
        @InjectRepository(Research)
        private researchRepo: Repository<Research>,
    ){}

    private getDataBaseQuery(){
        return this.DataRepo
            .createQueryBuilder('v')
            .orderBy('v.dataId','ASC');
    }

    //record dataset    
    public async createData(input:RecordDataDto, user:Researcher): Promise<Data>{
        const research = await this.researchService.getResearchById(input.researchId);
        if (!research) {
        throw new NotFoundException(`Research with topic name ${input.researchId} not found`);
        }

        const newData = this.DataRepo.create({
            ...input,
            data: input.data,
            metadata: input.metadata,
            research: research,
            recordedByID: user,
        });

        const savedData = await this.DataRepo.save(newData);
        return savedData;
    }

    //get all Dataset
    async getAllData(): Promise<Data[]> {
        const queryBuilder = this.getDataBaseQuery();
        return await queryBuilder.getMany();
    }

    //get one Dataset
    public async getDataById(dataId: number): Promise<Data> {
        const queryBuilder = this.getDataBaseQuery();
        queryBuilder.where('v.dataId = :dataId', { dataId });
        return await queryBuilder.getOne();
    }

    //update data info
    public async updateData(data: Data, input: UpdateDataDto): Promise<Data>{
        const updatedData = await this.DataRepo.save({
            ...data,
            ...input
          });
        
        return this.getDataById(updatedData.dataId);
    }
}