import { ApiProperty } from "@nestjs/swagger";

export class AnalystResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userID: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: [String] })
    roles: string[];
}
