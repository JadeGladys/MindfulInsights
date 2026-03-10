import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MaintenanceExpense } from '../maintenance/maintenanceExpense.entity';
import * as express from 'express';
import { Researcher } from "src/Users/researcher/researcher.entity";

@Entity()
export class SpareParts {
    @PrimaryGeneratedColumn()
    sparepart_ID: number;

    @Column()
    @Expose()
    PartName: string;

    @Column()
    @Expose()
    Manufacturer: string;

    @Column()
    @Expose()
    Brand: string;

    @Column()
    @Expose()
    PartDescription: string;

    @Column()
    @Expose()
    UnitPrice: number;

    @Column()
    @Expose()
    Quantity: number;

    @OneToMany(() => MaintenanceExpense, (maintenanceExpense) => maintenanceExpense.SparePart,{
        cascade: true
    })
    @Expose()
    expense: MaintenanceExpense[];

    @ManyToOne(() => Researcher, (user) => user.recorded)
    @JoinColumn()
    @Expose()
    recordedBy: Researcher;
}