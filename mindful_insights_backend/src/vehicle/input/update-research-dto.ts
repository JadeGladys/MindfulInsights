import { PartialType } from "@nestjs/mapped-types";
import { NewResearchRecordDto } from "./record-new-research.dto";

export class UpdateResearchDto  extends PartialType(NewResearchRecordDto){
    
}