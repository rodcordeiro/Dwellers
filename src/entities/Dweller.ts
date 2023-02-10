import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('dwellers')
@Index(
  'idx_attrb',
  [
    '_id',
    'Strength',
    'Perception',
    'Endurance',
    'Charisma',
    'Intelligence',
    'Agility',
    'Luck',
  ],
  { unique: true, background: true },
)
export class Dweller {
  @PrimaryColumn({ type: 'varchar', length: '100' })
  _id: string;

  @Column({ type: 'varchar', length: '100' })
  name: string;

  @Column({ type: 'varchar', enum: ['F', 'M'] })
  gender: string;

  @Column({ type: 'int' })
  lvl: number;

  @Column({ type: 'varchar', length: '100', nullable: true })
  father: string;

  @Column({ type: 'varchar', length: '100', nullable: true })
  mother: string;

  @Column({ type: 'int' })
  Strength: number;

  @Column({ type: 'int' })
  Perception: number;

  @Column({ type: 'int' })
  Endurance: number;

  @Column({ type: 'int' })
  Charisma: number;

  @Column({ type: 'int' })
  Intelligence: number;

  @Column({ type: 'int' })
  Agility: number;

  @Column({ type: 'int' })
  Luck: number;

  @CreateDateColumn()
  born: string;

  @UpdateDateColumn()
  updated: string;

  job: string;
}
