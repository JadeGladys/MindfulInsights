import { Injectable, NotFoundException } from "@nestjs/common";
import { Analysis } from './analysis.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NewAnalysisRecordDto } from "./input/record-new-analysis.dto";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { ResearchService } from "src/vehicle/research.service";
import { create, all } from 'mathjs';

const math = create(all);

@Injectable()
export class AnalysisService {
    constructor(
        @InjectRepository(Analysis)
        private readonly analysisRepo: Repository<Analysis>,
        private readonly researchService: ResearchService
    ) {}

    private getAnalysisRepoBaseQuery() {
        return this.analysisRepo
            .createQueryBuilder('i')
            .orderBy('i.analysis_ID', 'ASC');
    }

    public async recordAnalysis(input: NewAnalysisRecordDto, user: Researcher): Promise<Analysis> {
        const research = await this.researchService.getResearchById(input.research_ID);
        if (!research) {
            throw new NotFoundException(`Research with registration number ${input.research_ID} not found`);
        }

        // Perform calculations using Math.js
        const primaryOutcomeArray = input.primaryOutcome.split(',').map(value => parseFloat(value));
        const calculatedMean = math.mean(primaryOutcomeArray) as unknown as number;
        const calculatedStdDev = math.std(primaryOutcomeArray) as unknown as number;
        const sampleSize = Number(input.sampleSize); // Ensure sample size is a number

        // Ensure calculatedMean, calculatedStdDev, and sampleSize are numbers before the calculation
        if (typeof calculatedMean === 'number' && typeof calculatedStdDev === 'number' && typeof sampleSize === 'number') {
            const calculatedTTest = calculatedMean / (calculatedStdDev / Math.sqrt(sampleSize));

            const analysis = this.analysisRepo.create({
                ...input,
                recordedBy: user,
                research: research,
                mean: calculatedMean,
                standardDeviation: calculatedStdDev,
                tTest: calculatedTTest
            });

            const savedAnalysis = await this.analysisRepo.save(analysis);
            return savedAnalysis;
        } else {
            throw new Error('Mean, standard deviation, or sample size is not a number');
        }
    }

    async getAllAnalysis(): Promise<Analysis[]> {
        const queryBuilder = this.getAnalysisRepoBaseQuery();
        return await queryBuilder.getMany();
    }

    public async getAnalysisById(analysis_ID: number): Promise<Analysis> {
        const queryBuilder = this.getAnalysisRepoBaseQuery();
        queryBuilder.where('i.analysis_ID = :analysis_ID', { analysis_ID });
        return await queryBuilder.getOne();
    }

    public async paginate(page = 1): Promise<any> {
        const take = 1;
        const [Analysis, total] = await this.analysisRepo.findAndCount({
            take,
            skip: (page - 1) * take
        });
        return {
            data: Analysis,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        };
    }
}