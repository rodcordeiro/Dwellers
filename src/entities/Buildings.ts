import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

@Entity('build')
@Index('idx_build', ['_id', 'name', 'attribute'], {
  unique: true,
  background: true,
})
export class Building {
  @PrimaryColumn({ type: 'varchar', length: '100' })
  _id: string;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @Column({ type: 'int', default: 1 })
  lvl: number;

  @Column({ type: 'varchar', enum: ['S', 'P', 'E', 'C', 'I', 'A', 'L'] })
  attribute: string;

  @Column({ type: 'int', default: 2 })
  max_workers: number;
}
