import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class PublicationRequestDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    researchId: number;

    @ApiProperty()
    @IsNotEmpty()
    recordedById: number;
}