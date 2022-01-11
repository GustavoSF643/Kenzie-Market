import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Cart from './Cart';
import Product from './Product';

@Entity('carts')
class CartProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cart)
    cart: Cart;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    cart_id: string;

    @Column()
    product_id: string

    @Column()
    price: number;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
};

export default CartProduct;