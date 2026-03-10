import { Body, ClassSerializerInterceptor, Controller, ForbiddenException, Get, HttpException, Injectable, NotFoundException, Param, Patch, Post, Query, SerializeOptions, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Public } from "src/auth/config/public.decorator";
import { ResearchService } from "./research.service";
import { CurrentUser } from "src/Users/researcher/current-user.decorator";
import { NewResearchRecordDto } from "./input/record-new-research.dto";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { AuthGuardJwt } from "src/auth/config/auth.guard.jwt";
import { Research } from "./research.entity";
import { UpdateResearchDto } from "./input/update-research-dto";
import { EntityNotFoundError, QueryBuilder } from "typeorm";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Multer } from 'multer';

@Controller('/research')
@SerializeOptions({strategy: 'excludeAll'})
export class ResearchController{
    constructor(
        private readonly researchService: ResearchService
    ) {}


    //Get All Researchers
    @Get()
    @UseGuards(AuthGuardJwt)
    async getAllResearch(@Query('page') page = 1): Promise<Research[]> {
        return await this.researchService.paginate(page);
    }

    //Get approved research by keyword
    @Public()
    @Get('search')
    async getApprovedResearchByKeyword(@Query('keyword') keyword: string): Promise<Research[]> {
        return this.researchService.getApprovedResearchByKeyword(keyword);
    }

    //Get One Researcher
    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getEventById(@Param('id') research_ID: number) {
        try {
            return await this.researchService.getResearchById(research_ID);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Research not found', 404);
            }
            throw error;
        }
    }

    //get One Researcher by recorded by
    @Get('user/:userID')
    @UseGuards(AuthGuardJwt)
    async getResearchByUser(@Param('userID') userID: string) {
        try {
            return await this.researchService.getResearchByUser(userID);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Research not found', 404);
            }
            throw error;
        }
    }

        @Get('user/:userID/status/pending')
        @UseGuards(AuthGuardJwt)
        async getResearchByUserAndStatus(@Param('userID') userID: string) {
            try {
                return await this.researchService.getResearchByUserAndStatus(userID);
            } catch (error) {
                if (error instanceof EntityNotFoundError) {
                    throw new HttpException('Research not found', 404);
                }
                throw error;
            }
        }

    
    // Get research by topic
    @Get('topic/:topic')
    @UseGuards(AuthGuardJwt)
    async getResearchByTopic(@Param('topic') topic: string) {
        try {
            return await this.researchService.getResearchByTopic(topic);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Research not found', 404);
            }
            throw error;
        }
    }

    //Get research by status
    @Get('status/approved')
    @UseGuards(AuthGuardJwt)
    async getApprovedResearch() {
        try {
            return await this.researchService.getApprovedResearch();
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Pending research not found', 404);
            }
            throw error;
        }
    }

    //Get research by status
    @Get('status/completed')
    @UseGuards(AuthGuardJwt)
    async getCompletedResearch() {
        try {
            return await this.researchService.getCompletedResearch();
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Pending research not found', 404);
            }
            throw error;
        }
    }

    //Get research by status
    @Get('status/pending')
    @UseGuards(AuthGuardJwt)
    async getPendingResearch() {
        try {
            return await this.researchService.getPendingResearch();
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Pending research not found', 404);
            }
            throw error;
        }
    }

    //status=pending
    @Get('topic/:topic/status/pending')
    @UseGuards(AuthGuardJwt)
    async getResearchByTopicAndStatus(@Param('topic') topic: string) {
        try {
            return await this.researchService.getResearchByTopicAndStatus(topic);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Research not found', 404);
            }
            throw error;
        }
    }

    //status=complete
    @Get('topic/:topic/status/completed')
    @UseGuards(AuthGuardJwt)
    async getResearchByTopicAndStatusCompleted(@Param('topic') topic: string) {
        try {
            return await this.researchService.getResearchByTopicAndStatusCompleted(topic);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Research not found', 404);
            }
            throw error;
        }
    }

    //status=complete
    @Get('topic/:topic/status/published')
    @UseGuards(AuthGuardJwt)
    async getResearchByTopicAndStatuspublished(@Param('topic') topic: string) {
        try {
            return await this.researchService.getResearchByTopicAndStatuspublished(topic);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Research not found', 404);
            }
            throw error;
        }
    }


    //get research assigned to analyst
    @Get('assigned/:userID')
    @UseGuards(AuthGuardJwt)
    async getResearchByAssignedAnalyst(@Param('userID') userID: string) {
        try {
            return await this.researchService.getResearchByAssignedAnalyst(userID);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Research not found', 404);
            }
            throw error;
        }
    }


    //Record a New Research
    @Post('/create')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async Record(
        @Body() input: NewResearchRecordDto,
        @CurrentUser() user: Researcher
        ) {
        return await this.researchService.createResearch(input, user)
    }

    //Update A Research
    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @Param('id') research_ID, 
        @Body() input: UpdateResearchDto,
        @CurrentUser() user: Researcher
    ) {
        const research = await this.researchService.getResearchById(research_ID);

        if (!research) {
            throw new NotFoundException(`Research with topic ${research_ID} not found`);  
        }

        // if (research.recordedBy.id !== user.id) {
        //     throw new ForbiddenException(
        //         null, `You are not authorized to change this Dataset's data`
        //     );
        // }
        return await this.researchService.updateResearch(research_ID, input);
    }
    
}





// @Patch(':topic')
    // @UseGuards(AuthGuardJwt)
    // @UseInterceptors(ClassSerializerInterceptor)
    // async update(
    //     @Param('topic') topic, 
    //     @Body() input: UpdateResearchDto,
    //     @CurrentUser() user: Researcher
    //     ) {
    //     const research = await this.researchService.getResearchByTopic(topic);

    //     if(!research){
    //         throw new NotFoundException(`Vehicle with ID ${topic} not found`);  
    //     }

    //     if(research.recordedBy !== user){
    //         throw new ForbiddenException(
    //             null, `You are not authorized to change this vehicle's data`
    //         );
    //     }

    //     return await this.researchService.getResearchByTopic(research, input);
    // }

    //Record a New Researcher
    // @Post('/record')
    // @UseGuards(AuthGuardJwt)
    // @UseInterceptors(ClassSerializerInterceptor)
    // async Record(
    //     @Body() input: NewResearcherRecordDto,
    //     @CurrentUser() user: Researcher
    //     ) {
    //     return await this.researcherService.recordVehicle(input, user)
    // }