import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import CartProduct from './CartProduct';
import User from './User';

@Entity('carts')
class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart, { eager:true })
    products: CartProduct[];

    @Expose({ name: "subtotal" })
    getSubtotal(): number {
        return this.products.reduce(
            (acc, actual) => acc + Number(actual.product.price), 0
        );
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

export default Cart;