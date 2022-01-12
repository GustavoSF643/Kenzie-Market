import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import PurchaseProduct from './PurchaseProduct';
import User from './User';

@Entity('purchases')
class Purchase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => PurchaseProduct, (purchaseProduct) => purchaseProduct.product)
    products: PurchaseProduct[];

    @ManyToOne(() => User)
    user: User;

    @Column()
    userId: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
};

export default Purchase;