import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString, Length, IsNotEmpty, IsNumber } from "class-validator";

export class NewAnalysisRecordDto{
    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    title: string;

    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    researchQuestion: string;

    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    studyDesign: string;

    @IsInt()
    @IsNotEmpty()
    sampleSize: number;

    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    demographics: string;

    @IsString()
    @IsNotEmpty()
    primaryOutcome: string;

    @IsString()
    @IsOptional()
    secondaryOutcome?: string;

    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    statisticalTests: string;

    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    dataAnalysisSoftware: string;

    @IsBoolean()
    @IsNotEmpty()
    ethicalConsiderationsInformedConsent: boolean;

    @IsBoolean()
    @IsNotEmpty()
    ethicalConsiderationsConfidentiality: boolean;

    @IsBoolean()
    @IsNotEmpty()
    ethicalConsiderationsDebriefing: boolean;

    @IsString()
    @IsOptional()
    additionalNotes?: string;

    
    @ApiProperty()
    recordedById: number;
    
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    research_ID: number;

    @IsNumber()
    @IsOptional()
    mean?: number;

    @IsNumber()
    @IsOptional()
    standardDeviation?: number;

    @IsNumber()
    @IsOptional()
    tTest?: number;
}