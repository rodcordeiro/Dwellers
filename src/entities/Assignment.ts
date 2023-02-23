import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Index,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Job } from './Jobs';
import { Dweller } from './Dweller';

@Entity('assignments')
@Index('idx_assignment', ['_id', 'dweller', 'job'])
export class Assignment {
  @PrimaryGeneratedColumn()
  _id: string;

  @JoinColumn({ name: 'dweller', referencedColumnName: '_id' })
  @OneToOne(() => Dweller, (dweller) => dweller._id, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  dweller: string;

  @JoinColumn({ name: 'job', referencedColumnName: '_id' })
  @ManyToOne(() => Job, (job) => job._id, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  job: string;

  @UpdateDateColumn()
  updated: string;
}
