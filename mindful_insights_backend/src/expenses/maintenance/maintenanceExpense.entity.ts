import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpareParts } from '../spareparts/spareParts.entity';
import { Researcher } from "src/Users/researcher/researcher.entity";
import { Research } from "src/vehicle/research.entity";

@Entity()
export class MaintenanceExpense{
    @PrimaryGeneratedColumn()
    MaintenanceExpense_ID: number;

    @ManyToOne(() => SpareParts, (spareParts) => spareParts.expense)
    @JoinColumn()
    @Expose()
    SparePart: SpareParts;

    @Column({ nullable: true })
    @Expose()
    MaintenanceDetails: string;

    @Column()
    @Expose()
    TotalPrice: number;

    @Column()
    @Expose()
    TransactionDate: Date;
    //expense_ID: number;

    @ManyToOne(() => Research, (vehicle) => vehicle.maintenanceExpense)
    @JoinColumn()
    @Expose()
    vehicle: Research;
    
    @ManyToOne(() => Researcher, (user) => user.recorded)
    @JoinColumn()
    @Expose()
    recordedBy: Researcher;

}