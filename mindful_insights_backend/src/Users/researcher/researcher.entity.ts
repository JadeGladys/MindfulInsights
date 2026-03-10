import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
// import { Event } from "src/events/event.entity";
import { Expose } from "class-transformer";
// import { Attendee } from "src/events/attendee.entity";
import { Research } from 'src/vehicle/research.entity';
import { Analysis } from "src/Analysis/analysis.entity";
import { Data } from "src/vehicle/data/data.entity";
import { Role } from "src/roles/role.entity";
import { SpareParts } from "src/expenses/spareparts/spareParts.entity";
import { MaintenanceExpense } from "src/expenses/maintenance/maintenanceExpense.entity";
import { PublicationRequest } from "src/publicationrequest/publication-request.entity";

@Entity()
export class Researcher {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({unique: true})
  @Expose()
  userID: string;

  @Column({unique: true})
  @Expose()
  username: string;

  @Column({ nullable: true })
  @Expose()
  firstName: string;

  @Column({ nullable: true })
  @Expose()
  lastName: string;

  @Column()
  @Expose()
  email: string;

  @Column({unique: true})
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  @Expose()
  profile: Profile;

  @OneToMany(() => Research, (research) => research.researcher,{
    cascade: true
  })
  @Expose()
  research: Research[];
  
  @OneToMany(() => Research, (research) => research.recordedBy)
  recorded: Research[]; 

  @OneToMany(() => Data, (data) => data.recordedBy)
  data: Data[];

  @OneToMany(() => SpareParts, (sparePart) => sparePart.recordedBy)
  sparepart: SpareParts[];

  @OneToMany(() => MaintenanceExpense, (maintenanceExpense) => maintenanceExpense.recordedBy)
  maintenanceExpense: MaintenanceExpense[];

  @OneToMany(() => PublicationRequest, (logBook) => logBook.recordedBy)
  logBook: PublicationRequest[];

  @OneToMany(() => Role, role => role.researcher, { cascade: true })
  roles: Role[];
}
