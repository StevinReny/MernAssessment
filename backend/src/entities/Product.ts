import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}