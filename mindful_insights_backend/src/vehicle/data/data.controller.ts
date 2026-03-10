import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseGuards, UseInterceptors, Get, Param, Patch, NotFoundException, ForbiddenException, HttpException } from '@nestjs/common';
import { DataService } from './data.service';
import { AuthGuardJwt } from 'src/auth/config/auth.guard.jwt';
import { RecordDataDto } from '../input/record-data.dto';
import { CurrentUser } from 'src/Users/researcher/current-user.decorator';
import { Researcher } from 'src/Users/researcher/researcher.entity';
import { Data } from './data.entity';
import { UpdateDataDto } from '../input/update-data.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('/data')
@SerializeOptions({strategy: 'excludeAll'})
export class DataController{
    constructor(
        private readonly dataService: DataService
    ) {}

    //Get All Dataset
    @Get('/all')
    @UseGuards(AuthGuardJwt)
    async getAllAffectations(): Promise<Data[]> {
        return await this.dataService.getAllData();
    }

    //Get One Dataset
    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getEventById(@Param('id') affectation_ID: number) {
        try {
            return await this.dataService.getDataById(affectation_ID);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Research not found', 404);
            }
            throw error;
        }
    }

    //create an Dataset
    @Post('/create')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async Create(
        @Body() input: RecordDataDto,
        @CurrentUser() user: Researcher
        ) {
        return await this.dataService.createData(input, user)
    }

    //Update A Dataset
    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @Param('id') dataId, 
        @Body() input: UpdateDataDto,
        @CurrentUser() user: Researcher
        ) {
        const affectation = await this.dataService.getDataById(dataId);

        if(!affectation){
            throw new NotFoundException(`Dataset with ID ${dataId} not found`);  
        }

        if(affectation.recordedByID.id !== user.id){
            throw new ForbiddenException(
                null, `You are not authorized to change this Dataset's data`
            );
        }

        return await this.dataService.updateData(affectation, input);
    }
}