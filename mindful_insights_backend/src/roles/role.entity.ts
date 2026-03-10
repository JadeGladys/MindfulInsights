import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Researcher } from 'src/Users/researcher/researcher.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Researcher, (researcher) => researcher.roles)
  researcher: Researcher;
}
