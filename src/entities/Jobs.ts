import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { Building } from './Buildings';

@Entity('jobs')
@Index('idx_assignment', ['_id', 'name', 'place'])
export class Job {
  @PrimaryColumn({ type: 'varchar', length: '100' })
  _id: string;

  @Column({ type: 'varchar', length: 40, nullable: false })
  name: string;

  @OneToOne(() => Building, (build) => build._id, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'build', referencedColumnName: '_id' })
  place: string;
}
