import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleItems } from "./SaleItems";

@Entity()
export class SaleEntry{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    saleDate!:Date

    @OneToMany(()=>SaleItems,(item)=>item.saleEntry)
    saleItems!:SaleItems[]

    
}