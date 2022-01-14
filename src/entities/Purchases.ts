import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import PurchaseProduct from './PurchaseProduct';
import User from './User';

@Entity('purchases')
class Purchase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => PurchaseProduct, (purchaseProduct) => purchaseProduct.purchase, {eager: true})
    products: PurchaseProduct[];

    @Expose({ name: "subtotal" })
    getSubtotal(): number {
        const subtotal = this.products.reduce(
            (acc, actual) => {
                return acc + Number(actual.price)
            }, 0
        );

        return subtotal;
    };

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