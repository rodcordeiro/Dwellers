import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Building } from './Buildings';
import { Dweller } from './Dweller';

@Entity('assignments')
@Index('idx_assignment',['_id','dweller','place'])
export class Assignment {
  @PrimaryGeneratedColumn()
  _id: string;

  @OneToOne(() => Dweller, (dweller) => dweller._id, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'dweller', referencedColumnName: '_id' })
  dweller: string;

  @OneToOne(() => Building, (build) => build._id, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'place', referencedColumnName: '_id' })
  place: string;
}
