import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Product from './Product';
import Purchase from './Purchases';
import User from './User';

@Entity('purchase_products')
class PurchaseProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Purchase)
    purchase: Purchase;

    @ManyToOne(() => Product, {eager:true})
    product: Product;

    @Column()
    purchaseId: string;

    @Column()
    productId: string

    @Column()
    price: number;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
};

export default PurchaseProduct;