import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { AnalysisService } from "./analysis.service";
import { AuthGuardJwt } from "src/auth/config/auth.guard.jwt";
import { CurrentUser } from "src/Users/researcher/current-user.decorator";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { NewAnalysisRecordDto } from "./input/record-new-analysis.dto";
import { Analysis } from './analysis.entity';

@Controller('/analysis')
@SerializeOptions({strategy: 'excludeAll'})
export class AnalysisController{
    constructor(
        private readonly analysisService: AnalysisService
    ) {}


    //Get All Analysis
    @Get()
    @UseGuards(AuthGuardJwt)
    async getAllAnalysis(@Query('page') page = 1): Promise<Analysis[]> {
        return await this.analysisService.paginate(page);
    }

    //Get One Analysis
    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getAnalysisById(@Param('id') analysis_ID: number) {
        return await this.analysisService.getAnalysisById(analysis_ID);
    }
    
    //Record a New Analysis
    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async Record(
        @Body() input: NewAnalysisRecordDto,
        @CurrentUser() user: Researcher
        ) {
        return await this.analysisService.recordAnalysis(input, user)
    }
}