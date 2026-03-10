import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisController } from "src/Analysis/analysis.controller";
import { Analysis } from "src/Analysis/analysis.entity";
import { AnalysisService } from "src/Analysis/analysis.service";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy } from "src/auth/config/jwt.strategy";
import { LocalStrategy } from "src/auth/config/local.strategy";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { ResearcherController } from "src/Users/researcher/researcher.controller";
import { MaintenanceController } from "src/expenses/maintenance/maintenance.controller";
import { MaintenanceService } from "src/expenses/maintenance/maintenance.service";
import { MaintenanceExpense } from "src/expenses/maintenance/maintenanceExpense.entity";
import { SpareParts } from "src/expenses/spareparts/spareParts.entity";
import { SparePartController } from "src/expenses/spareparts/sparepart.controller";
import { SparePartService } from "src/expenses/spareparts/sparepart.service";
import { RoleController } from "src/roles/role.controller";
import { Role } from "src/roles/role.entity";
import { RoleService } from "src/roles/role.service";
import { Research } from "src/vehicle/research.entity";
import { Data } from "src/vehicle/data/data.entity";
import { DataService } from "src/vehicle/data/data.service";
import { DataController } from "src/vehicle/data/data.controller";
import { ResearchController } from "src/vehicle/research.controller";
import { ResearchService } from "src/vehicle/research.service";
import { PublicationRequest } from "src/publicationrequest/publication-request.entity";
import { PublicationRequestService } from "src/publicationrequest/publication-request.service";
import { ResearcherService } from "src/Users/researcher/researcher.service";
import { PublicationRequestController } from "src/publicationrequest/publication-request.controller";
import { TokenBlacklistService } from "src/auth/config/tokenblacklist";

@Module({
    imports: [TypeOrmModule.forFeature([
        Researcher, 
        Analysis, 
        Research,
        Data,
        Role,
        SpareParts,
        MaintenanceExpense,
        PublicationRequest
        
    ]),
    JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.AUTH_SECRET,
            signOptions: {
                expiresIn: '60m'
            }
        })
    })
],
    providers: [
        LocalStrategy, 
        JwtStrategy, 
        AuthService,
        AnalysisService, 
        ResearcherService,
        ResearchService,
        DataService,
        RoleService,
        SparePartService,
        MaintenanceService,
        PublicationRequestService,
        TokenBlacklistService
    ],
    controllers: [
        AuthController, 
        ResearcherController,
        AnalysisController,
        RoleController,
        ResearcherController,
        ResearchController,
        DataController,
        SparePartController,
        MaintenanceController,
        PublicationRequestController
    ]
})
export class MainModule{

}