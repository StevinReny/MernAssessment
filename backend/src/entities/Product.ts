import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntry } from "./ProductEntry";
import { SaleItems } from "./SaleItems";

@Entity()
export class Product{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    name!:string

    @Column({unique:true})
    sku!:string

    @Column()
    price!:number

    @Column({default:0})
    currentStock!:number

    @Column()
    taxPercentage!:number

    @CreateDateColumn()
    createdAt!:Date

    @OneToMany(()=>ProductEntry,(productEntry)=>productEntry.product)
    productEntries!:ProductEntry[]

    @OneToMany(()=>SaleItems,(saleItem)=>saleItem.product)
    saleItems!:SaleItems[]
}