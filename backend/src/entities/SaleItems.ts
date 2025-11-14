import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SaleEntry } from "./SaleEntry"
import { Product } from "./Product"

@Entity()
export class SaleItems{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    quantity!:number    

    @Column()
    salePrice!:number

    @ManyToOne(()=>SaleEntry,(saleEntry)=>saleEntry.saleItems,{onDelete:"CASCADE"})
    saleEntry!:SaleEntry

    @ManyToOne(()=>Product,(product)=>product.saleItems)
    product!:Product

}