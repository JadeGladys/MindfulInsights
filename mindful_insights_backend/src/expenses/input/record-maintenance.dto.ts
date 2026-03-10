import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NewMaintenanceRecordDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    MaintenanceDetails: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    partName: string;

    @ApiProperty()
    sparePartSparepartID: number;

    @IsNotEmpty()
    @ApiProperty()
    TotalPrice: number;

    @IsNotEmpty()
    @ApiProperty()
    TransactionDate: Date;

    @ApiProperty()
    vehicleVehicleID: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    VIN: string;
}