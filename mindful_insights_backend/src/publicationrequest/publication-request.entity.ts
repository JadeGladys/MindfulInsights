import { Expose } from "class-transformer";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { Research } from "src/vehicle/research.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PublicationRequest{
    @PrimaryGeneratedColumn()
    Pub_ID: number;

    @OneToOne(() => Research, research => research.publicationRequest)
    research: Research;

    @ManyToOne(() => Researcher, (user) => user.recorded)
    @JoinColumn()
    @Expose()
    recordedBy: Researcher;
}