import { Expose } from "class-transformer";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { Research } from "src/vehicle/research.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne } from "typeorm";

@Entity()
export class Analysis{
    @PrimaryGeneratedColumn()
    @Expose()
    analysis_ID: number;

    @Column({ type: 'varchar', length: 255 })
    @Expose()
    title: string;

    @Column({ type: 'varchar', length: 255 })
    @Expose()
    researchQuestion: string;

    @Column({ type: 'varchar', length: 255 })
    @Expose()
    studyDesign: string;

    @Column({ type: 'int' })
    @Expose()
    sampleSize: number;

    @Column({ type: 'varchar', length: 255 })
    @Expose()
    demographics: string;

    @Column({ type: 'text' })
    @Expose()
    primaryOutcome: string;  

    @Column({ type: 'text', nullable: true })
    @Expose()
    secondaryOutcome?: string;  

    @Column({ type: 'varchar', length: 255 })
    @Expose()
    statisticalTests: string;

    @Column({ type: 'varchar', length: 255 })
    @Expose()
    dataAnalysisSoftware: string;

    @Column({ type: 'boolean' })
    @Expose()
    ethicalConsiderationsInformedConsent: boolean;

    @Column({ type: 'boolean' })
    @Expose()
    ethicalConsiderationsConfidentiality: boolean;

    @Column({ type: 'boolean' })
    @Expose()
    ethicalConsiderationsDebriefing: boolean;

    @Column({ type: 'text', nullable: true })
    @Expose()
    additionalNotes?: string;

    @ManyToOne(() => Researcher, (user) => user.recorded)
    @JoinColumn()
    @Expose()
    recordedBy: Researcher;

    // @ManyToOne(() => Analyst, (user) => user.recorded)
    // @JoinColumn()
    // @Expose()
    // recordedBy: Analyst;

    @OneToOne(() => Research, (research) => research.analysis)
    @JoinColumn()
    @Expose()
    research: Research;

    @Column({ type: 'float', nullable: true })
    @Expose()
    mean?: number;

    @Column({ type: 'float', nullable: true })
    @Expose()
    standardDeviation?: number;

    @Column({ type: 'float', nullable: true })
    @Expose()
    tTest?: number;
}