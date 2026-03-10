import { Expose } from "class-transformer";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { Data } from "src/vehicle/data/data.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MaintenanceExpense } from '../expenses/maintenance/maintenanceExpense.entity';
import { PublicationRequest } from "src/publicationrequest/publication-request.entity";
import { Analysis } from "src/Analysis/analysis.entity";

@Entity()
export class Research{
    @PrimaryGeneratedColumn()
    research_ID: number;

    @Column()
    @Expose()
    topic: string;

    @Column()
    @Expose()
    objective: string;

    @Column()
    @Expose()
    startDate: Date;

    @Column()
    @Expose()
    endDate: Date;

    @Column({ nullable: true })
    @Expose()
    description: string;

    @Column({ nullable: true })
    @Expose()
    abstract: string;

    @Column({ default: 'WorkInProgress' })
    @Expose()
    status: string;

    @Column({ nullable: true })
    @Expose()
    areaOfResearch: string;

    @Column({ nullable: true })
    @Expose()
    hypothesis: string;

    @Column({ nullable: true })
    @Expose()
    dataCollectionMethod: string;

    @Column({ type: 'bytea', nullable: true })
    @Expose()
    dataCollected: Buffer;

    @Column({ type: 'bytea', nullable: true })
    @Expose()
    dataset: Buffer;

    @Column({ nullable: true })
    @Expose()
    comments: string;

    @ManyToOne(() => Researcher, (researcher) => researcher.research)
    @JoinColumn()
    @Expose()
    researcher: Research;

    @ManyToOne(() => Researcher, (user) => user.recorded)
    @JoinColumn()
    @Expose()
    recordedBy: Researcher;

    //store assigned analyst
    @ManyToOne(() => Researcher, { nullable: true })
    @JoinColumn()
    @Expose()
    analyst: Researcher;

    //store assigned hod
    @ManyToOne(() => Researcher, { nullable: true })
    @JoinColumn()
    @Expose()
    hod: Researcher;

    @OneToOne(() => Analysis, (analysis) => analysis.research)
    @JoinColumn()
    @Expose()
    analysis: Analysis;

    @OneToMany(() => Data, (data) => data.research,{
        cascade: true
    })
    @Expose()
    data: Data[];

    @OneToMany(() => MaintenanceExpense, (maintenanceExpense) => maintenanceExpense.vehicle,{
        cascade: true
    })
    @Expose()
    maintenanceExpense: MaintenanceExpense[];

    @OneToOne(() => PublicationRequest, publicationRequest => publicationRequest.research)
    @JoinColumn()
    publicationRequest: PublicationRequest;

    
}