import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Research } from './research.entity';
import { NewResearchRecordDto } from "./input/record-new-research.dto";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { UpdateResearchDto } from "./input/update-research-dto";
import { ResearcherService } from "src/Users/researcher/researcher.service";

@Injectable()
export class ResearchService{
    constructor(
        @InjectRepository(Research)
        private readonly researchRepo: Repository<Research>,
        private readonly reseacherService: ResearcherService
    ){}

    private getResearchBaseQuery(){
        return this.researchRepo
            .createQueryBuilder('v')
            .orderBy('v.research_ID','ASC');
    }

    // Get approved research by keyword
    async getApprovedResearchByKeyword(keyword: string): Promise<Research[]> {
        const queryBuilder = this.getResearchBaseQuery();
        queryBuilder.where('v.status = :status', { status: 'approved' });
    
        if (keyword) {
          queryBuilder.andWhere(
            'v.topic LIKE :keyword OR v.description LIKE :keyword',
            { keyword: `%${keyword}%` },
          );
        }
    
        return await queryBuilder.getMany();
    }

    //record research
    public async createResearch(input: NewResearchRecordDto, user: Researcher): Promise<Research> {
        const researcher = await this.reseacherService.getResearcherByUserID(input.userID);
        if (!researcher) {
            throw new NotFoundException(`Researcher with ID ${input.userID} not found`);
        }
    
        const research = this.researchRepo.create({
            ...input,
            startDate: new Date(input.startDate),
            endDate: new Date(input.endDate),
            researcher: researcher, 
            recordedBy: user
        });
    
        const savedResearch = await this.researchRepo.save(research);

        // Randomly select an analyst and assign to the research
        const analysts = await this.reseacherService.getAnalyst();
        if (analysts.length > 0) {
            const randomAnalyst = analysts[Math.floor(Math.random() * analysts.length)];
            savedResearch.analyst = randomAnalyst;
            await this.researchRepo.save(savedResearch);
        }

        return savedResearch;
    }
    

    //get all research
    async getAllResearch(): Promise<Research[]> {
        const queryBuilder = this.getResearchBaseQuery();
        return await queryBuilder.getMany();
    }

    //get one research
    public async getResearchById(research_ID: number): Promise<Research> {
        const queryBuilder = this.getResearchBaseQuery();
        queryBuilder.where('v.research_ID = :research_ID', { research_ID });
        queryBuilder.leftJoinAndSelect('v.recordedBy', 'recordedBy');
        return await queryBuilder.getOne();
    }
    

    //get one researchh by recorded by
    public async getResearchByUser(userID: string): Promise<Research[]> {
        return await this.researchRepo
            .createQueryBuilder('research')
            .leftJoinAndSelect('research.recordedBy', 'recordedBy')
            .leftJoinAndSelect('research.analyst', 'analyst')
            .where('recordedBy.userID = :userID', { userID })
            .getMany();
    }

        //+status = pending

        public async getResearchByUserAndStatus(userID: string): Promise<Research[]> {
            return await this.researchRepo
                .createQueryBuilder('research')
                .leftJoinAndSelect('research.recordedBy', 'recordedBy')
                .where('recordedBy.userID = :userID', { userID })
                .andWhere('research.status = :status', { status: 'WorkInProgress' })
                .getMany();
        }
    

    // Get one research by topic
    public async getResearchByTopic(topic: string): Promise<Research> {
        return await this.researchRepo
            .createQueryBuilder('research')
            .leftJoinAndSelect('research.recordedBy', 'recordedBy')
            .where('research.topic = :topic', { topic })
            .getOneOrFail();
    }

    //get one research by status=approved
    public async getApprovedResearch(): Promise<Research[]> {
        return await this.researchRepo
            .createQueryBuilder('research')
            .leftJoinAndSelect('research.recordedBy', 'recordedBy')
            .where('research.status = :status', { status: 'approved' })
            .getMany();
    }

    //get one research by status=completed
    public async getCompletedResearch(): Promise<Research[]> {
        return await this.researchRepo
         .createQueryBuilder('research')
         .leftJoinAndSelect('research.recordedBy', 'ecordedBy')
         .leftJoinAndSelect('research.analyst', 'analyst') // Add this line
         .where('research.status = :status', { status: 'completed' })
         .getMany();
    }

    //get one research by status=pending
    public async getPendingResearch(): Promise<Research[]> {
        return await this.researchRepo
            .createQueryBuilder('research')
            .leftJoinAndSelect('research.recordedBy', 'recordedBy')
            .where('research.status = :status', { status: 'WorkInProgress' })
            .getMany();
    }

        //by topic and status=pending
        public async getResearchByTopicAndStatus(topic: string): Promise<Research[]> {
            return await this.researchRepo
                .createQueryBuilder('research')
                .leftJoinAndSelect('research.recordedBy', 'recordedBy')
                .where('research.topic = :topic', { topic })
                .andWhere('research.status = :status', { status: 'WorkInProgress' })
                .getMany();
        }

        //by topic and status=complete
        public async getResearchByTopicAndStatusCompleted(topic: string): Promise<Research[]> {
            return await this.researchRepo
                .createQueryBuilder('research')
                .leftJoinAndSelect('research.recordedBy', 'recordedBy')
                .where('research.topic = :topic', { topic })
                .andWhere('research.status = :status', { status: 'completed' })
                .getMany();
        }

        //by topic and status=published
        public async getResearchByTopicAndStatuspublished(topic: string): Promise<Research[]> {
            return await this.researchRepo
                .createQueryBuilder('research')
                .leftJoinAndSelect('research.recordedBy', 'recordedBy')
                .where('research.topic = :topic', { topic })
                .andWhere('research.status = :status', { status: 'published' })
                .getMany();
        }
    
    // //get research assigned to analyst
    // public async getResearchByAssignedAnalyst(userID: string): Promise<Research[]> {
    //     return await this.researchRepo
    //         .createQueryBuilder('research')
    //         .leftJoinAndSelect('research.recordedBy', 'recordedBy')
    //         .leftJoinAndSelect('research.analyst', 'analyst')
    //         .where('analyst.userID = :userID', { userID })
    //         .getMany();
    // }

    //get research assigned to analyst
    public async getResearchByAssignedAnalyst(userID: string): Promise<Research[]> {
        return await this.researchRepo
            .createQueryBuilder('research')
            .leftJoinAndSelect('research.recordedBy', 'recordedBy')
            .leftJoinAndSelect('research.analyst', 'analyst')
            .where('analyst.userID = :userID', { userID })
            .andWhere('research.status = :status', { status: 'WorkInProgress' }) // Add this line to filter by status
            .getMany();
    }
    
    
      
    

    //getVehicleByRegistrationNo
    public async getVehicleByRegistrationNo(VIN: string): Promise<Research> {
        const queryBuilder = this.getResearchBaseQuery();
        queryBuilder.where('v.VIN = :VIN', { VIN });
        return await queryBuilder.getOne();
    }

    //update research info
    public async updateResearch(research_ID: number, input: UpdateResearchDto): Promise<Research> {
        const research = await this.getResearchById(research_ID);
    
        if (!research) {
          throw new NotFoundException(`Research with ID ${research_ID} not found`);
        }
    
        // Update research properties
        research.topic = input.topic || research.topic;
        research.objective = input.objective || research.objective;
        research.startDate = input.startDate || research.startDate;
        research.endDate = input.endDate || research.endDate;
        research.description = input.description || research.description;
        research.abstract = input.abstract || research.abstract;
        research.dataCollected = input.dataCollected || research.dataCollected;
        research.areaOfResearch = input.areaOfResearch || research.areaOfResearch;
        research.dataCollectionMethod = input.dataCollectionMethod || research.dataCollectionMethod;
        research.hypothesis = input.hypothesis || research.hypothesis;
        research.dataset = input.dataset || research.dataset;
        research.status = input.status || research.status;
        // Append new comment to existing comments
        if (input.comments) {
            const timestamp = new Date().toISOString();
            research.comments = research.comments 
                ? `${research.comments}\n[${timestamp}] ${input.comments}`
                : `[${timestamp}] ${input.comments}`;
        }
    
        // Save the updated research
        return await this.researchRepo.save(research);
      }
    //pagination
    public async paginate(page = 1, take = 10): Promise<any> {
        const [Research, total] = await this.researchRepo.findAndCount({
            take,
            skip: (page - 1) * take
        });
        return{
            data: Research,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }
}


//update research info
    // public async updateResearch(research: Research, input: UpdateResearchDto): Promise<Research>{
    //     const updatedResearch = await this.researchRepo.save({
    //         ...research,
    //         ...input
    //       });
        
    //     return this.getResearchByTopic(updatedResearch.topic);
    // }