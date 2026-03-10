import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { PublicationRequestService } from "./publication-request.service";
import { AuthGuardJwt } from "src/auth/config/auth.guard.jwt";
import { PublicationRequest } from "./publication-request.entity";
import { CurrentUser } from "src/Users/researcher/current-user.decorator";
import { PublicationRequestDto } from "./input/create-publication-request.dto";
import { Researcher } from "src/Users/researcher/researcher.entity";

@Controller('/publication')
@SerializeOptions({strategy: 'excludeAll'})
export class PublicationRequestController{
    constructor(
        private readonly publicationRequestService: PublicationRequestService
    ) {}

    //Get All LogBooks
    @Get('/all')
    @UseGuards(AuthGuardJwt)
    async getAllLogBooks(@Query('page') page = 1): Promise<PublicationRequest[]> {
        return await this.publicationRequestService.paginate(page);
    }

    //Get One LogBook
    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getLogBookByID(@Param('id') Pub_ID: number) {
        return await this.publicationRequestService.getPublicationRequestById(Pub_ID);
    }

    //Record a New LogBook
    @Post()
    async createPublicationRequest(@Body() input: PublicationRequestDto) {
        return this.publicationRequestService.createPublicationRequest(input);
    }
//     @Post('/record')
//     @UseGuards(AuthGuardJwt)
//     @UseInterceptors(ClassSerializerInterceptor)
//     async Record(
//         @Body() input: PublicationRequestDto,
//         @CurrentUser() user: Researcher
//         ) {
//         return await this.logBookService.recordInsurance(input, user)
//     }
}