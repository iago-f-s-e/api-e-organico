import { Column, Entity, Index, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Workday } from './workday';
import { Address } from './address';

@Entity('market')
export class Market extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'market_id' })
  public readonly id!: string;

  @Column({ type: 'varchar' })
  public readonly name!: string;

  @Index('IDX_market_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true })
  public readonly isActive!: boolean;

  @OneToMany(() => Workday, workdays => workdays.market, { cascade: true })
  public readonly workdays!: Workday[];

  @OneToOne(() => Address, address => address.market, { cascade: true })
  public readonly address!: Address;
}
