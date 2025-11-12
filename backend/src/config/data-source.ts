import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "../entities/Product";
import { ProductEntry } from "../entities/ProductEntry";
import { SaleEntry } from "../entities/SaleEntry";
import { SaleItems } from "../entities/SaleItems";
dotenv.config();




export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,

    entities: [Product,ProductEntry,SaleEntry,SaleItems],
});


export const ProductRepo=AppDataSource.getRepository(Product)
export const ProductEntryRepo=AppDataSource.getRepository(ProductEntry)
export const SaleEntryRepo=AppDataSource.getRepository(SaleEntry)
export const SaleItemRepo=AppDataSource.getRepository(SaleItems)