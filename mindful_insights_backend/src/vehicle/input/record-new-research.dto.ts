import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class NewResearchRecordDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    topic: string;
    
    @IsNotEmpty()
    @ApiProperty()
    objective: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    startDate: Date;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    endDate: Date;
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    @ApiProperty({ required: false })
    description: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    @ApiProperty({ required: false })
    abstract: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    areaOfResearch: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    hypothesis: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    dataCollectionMethod: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    dataCollected: Buffer;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    dataset: Buffer;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    status: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    comments: string;

    @ApiProperty()
    researcherID: number;
    
    @IsNotEmpty()
    @ApiProperty()
    userID: string;
}