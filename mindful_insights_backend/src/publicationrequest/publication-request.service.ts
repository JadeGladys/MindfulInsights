import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResearchService } from "src/vehicle/research.service";
import { Repository } from "typeorm";
import { PublicationRequest } from './publication-request.entity';
import { PublicationRequestDto } from "./input/create-publication-request.dto";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { ResearcherService } from "src/Users/researcher/researcher.service";
import { Research } from "src/vehicle/research.entity";

@Injectable()
export class PublicationRequestService{
    constructor(
        @InjectRepository(Research)
        private readonly researchRepo: Repository<Research>,
        @InjectRepository(PublicationRequest)
        private readonly publicationRequestRepo: Repository<PublicationRequest>,
        private readonly researchService: ResearchService,
        private readonly reseacherService: ResearcherService,
    ){}

    private getPublicationRequestBaseQuery(){
        return this.publicationRequestRepo
            .createQueryBuilder('l')
            .orderBy('l.Pub_ID','ASC');
    }

    // Service method to create a publication request and assign to a hod
    async createPublicationRequest(input: PublicationRequestDto): Promise<PublicationRequest> {
        const research = await this.researchService.getResearchById(input.researchId);
        if (!research) {
            throw new Error(`Research with ID ${input.researchId} not found`);
        }

        const publicationRequest = this.publicationRequestRepo.create({
            ...input,
            research,
        });

        const savedPublicationRequest = await this.publicationRequestRepo.save(publicationRequest);

        // Randomly select a hod and assign to the research
        const hods = await this.reseacherService.getHod();
        if (hods.length > 0) {
            const randomHod = hods[Math.floor(Math.random() * hods.length)];
            research.hod = randomHod;
        }

        // Change status to 'completed'
        research.status = 'completed';
        
        await this.researchRepo.save(research);

        return savedPublicationRequest;
    }

    // public async recordInsurance(input:PublicationRequestDto, user:Researcher): Promise<PublicationRequest>{
    //     const vehicle = await this.vehicleService.getVehicleByRegistrationNo(input.VIN);
    //     if (!vehicle) {
    //     throw new NotFoundException(`Vehicle with registration number ${input.VIN} not found`);
    //     }

    //     const logBook = this.logBookRepo.create({
    //         ...input,
    //         vehicle: vehicle,
    //         recordedBy: user
    //       });
        
    //       const savedLogBook = await this.logBookRepo.save(logBook);
    //       return savedLogBook;
    // }

    //get all logBooks
    async getAllgetPublicationRequests(): Promise<PublicationRequest[]> {
        const queryBuilder = this.getPublicationRequestBaseQuery();
        return await queryBuilder.getMany();
    }

    //get one logBook
    public async getPublicationRequestById(Pub_ID: number): Promise<PublicationRequest> {
        const queryBuilder = this.getPublicationRequestBaseQuery();
        queryBuilder.where('l.Pub_ID = :Pub_ID', { Pub_ID });
        return await queryBuilder.getOne();
    }

    //pagination
    public async paginate(page = 1): Promise<any> {
        const take = 1;
        const [LogBook, total] = await this.publicationRequestRepo.findAndCount({
            take,
            skip: (page - 1) * take
        });
        return{
            data: LogBook,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }
}