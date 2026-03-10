import { Expose } from "class-transformer";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { Research } from "src/vehicle/research.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Data{
    @PrimaryGeneratedColumn()
    dataId: number;

    @Column({ nullable: true })
    @Expose()
    title: string;

    @Column({ nullable: true })
    @Expose()
    field: string;

    @Column({ type: 'jsonb' }) 
    @Expose()
    data: any;

    @Column({ nullable: true })
    @Expose()
    metadata?: string; 

    @Column({ nullable: true })
    @Expose()
    createdAt: Date = new Date(); 

    @ManyToOne(() => Research, (research) => research.data)
    @JoinColumn()
    @Expose()
    research: Research;

    @ManyToOne(() => Researcher, (user) => user.data)
    @JoinColumn()
    @Expose()
    recordedByID: Researcher;

    @Column({ nullable: true })
    recordedBy: number;
}



    // @Column({ nullable: true })
    // vehicle: number;