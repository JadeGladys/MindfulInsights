import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RecordDataDto{
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @ApiProperty()
    field: string;

    @ApiProperty()
    data: any;

    @ApiProperty()
    metadata?: string;

    @IsNotEmpty()
    @ApiProperty()
    researchId: number;

    @IsNotEmpty()
    @ApiProperty()
    userID: string;
}