import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductEntry{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    quantity!:number

    @Column({default:1})
    purchasePrice!:number

    @Column()
    purchaseDate!:Date

    @ManyToOne(()=>Product,(product)=>product.productEntries)
    product!:Product
}