import { PartialType } from "@nestjs/mapped-types";
import { RecordDataDto } from "./record-data.dto";

export class UpdateDataDto extends PartialType(RecordDataDto){
    
}