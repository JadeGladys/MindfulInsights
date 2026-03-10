import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NewSparePartRecordDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    PartName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Manufacturer: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Brand: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    PartDescription: string;

    @IsNotEmpty()
    @ApiProperty()
    UnitPrice: number;

    @IsNotEmpty()
    @ApiProperty()
    Quantity: number;
}