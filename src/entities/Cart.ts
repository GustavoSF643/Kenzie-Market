import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import CartProduct from './CartProduct';
import User from './User';

@Entity('carts')
class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product, {
        eager: true,
    })
    products: CartProduct[];

    @ManyToOne(() => User)
    user: User;

    @Column()
    userId: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
};

export default Cart;