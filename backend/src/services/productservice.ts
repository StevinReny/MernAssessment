import { LessThan } from "typeorm";
import { ProductEntryRepo, ProductRepo, SaleEntryRepo, SaleItemRepo } from "../config/data-source"
import { DataDetails } from "../controllers/SaleController";
import { Product } from "../entities/Product"
import { ProductEntry } from "../entities/ProductEntry";
import { SaleEntry } from "../entities/SaleEntry";
import { SaleItems } from "../entities/SaleItems";
import { ApiError } from "../utils/apiError";
var random = require('random-string-alphanumeric-generator');

export const findProductByName=async(name:string)=>{

    const result=await ProductRepo.findOne({where:{name}})
    return result
}

export const createProduct=async(name:string,price:number,currentStock:number,taxPercentage:number)=>{
    const skn=random.randomAlphanumeric(10, "lowercase")

    const newProduct=new Product()
    newProduct.name=name
    newProduct.price=price
    newProduct.currentStock=currentStock
    newProduct.taxPercentage=taxPercentage
    newProduct.sku=skn

    return await ProductRepo.save(newProduct)
}

export const getAllProduct=async()=>{
    const result=await ProductRepo.find()
    return result
}

export const findProductById=async(id:string)=>{
    const product=await ProductRepo.findOneBy({id})
    return product
}

export const updateProductService=async(product:Product,name:string,price:number,currentStock:number,taxPercentage:number)=>{
    product.name=name
    product.price=price
    product.currentStock=currentStock
    product.taxPercentage=taxPercentage
    const updated=await ProductRepo.save(product)
    return updated
}

export const deleteProduct=async(id:string)=>{
    const producttoDelete=await findProductById(id)
    if(!producttoDelete){
        throw new ApiError("Product cannot be found",404)
    }

    await ProductRepo.remove(producttoDelete)
    return producttoDelete
}

export const createProductEntry=async(product:Product,quantity:number,purchaseDate:Date,purchasePrice:number)=>{
    const newEntry=new ProductEntry()
    newEntry.product=product
    newEntry.purchaseDate=purchaseDate
    newEntry.purchasePrice=purchasePrice
    newEntry.quantity=quantity
    const res=await ProductEntryRepo.save(newEntry)

    product.currentStock=product.currentStock+quantity
    await ProductRepo.save(product)
    return res
    
}

export const createNewSaleEntry=async(saleDate:Date)=>{
    const newSale=new SaleEntry()
    newSale.saleDate=saleDate;
    return await SaleEntryRepo.save(newSale)
}

export const createNewSaleItemEntry=async(item:DataDetails,saleEntry:SaleEntry)=>{

    const newItem=new SaleItems()
    const product=await ProductRepo.findOneBy({id:item.product_id})
    if(!product){
        throw new ApiError("Invalid product",400)
    }
    newItem.product=product
    if(product.currentStock<item.quantity){
        throw new ApiError(`The ${product.name} available Quantity is ${product.currentStock}`,400)
    }
    newItem.quantity=item.quantity
    newItem.saleEntry=saleEntry
    newItem.salePrice=product.price
    const newSaleItem= await SaleItemRepo.save(newItem)

    product.currentStock=product.currentStock-item.quantity
    await ProductRepo.save(product)
    return newSaleItem
}

export const updateSaleEntryPrice=async(saleEntry:SaleEntry,price:number,discount:number)=>{
    saleEntry.totalPrice=price
    saleEntry.discount=discount
    return await SaleEntryRepo.save(saleEntry)
}

export const findSaleBillById=async(id:string)=>{
    let totalPrice=0
    const sale= await SaleEntryRepo.findOne({where:{id},relations:{saleItems:{product:true}}})
    return sale
}

export const findAllBill=async()=>{
    return await SaleEntryRepo.find({relations:{saleItems:true}})
}

export const findCount=async()=>{
    return await ProductRepo.findAndCount({where:{currentStock:LessThan(10)}})
}
export const findtodayBill=async()=>{
    console.log(new Date())
    return await SaleEntryRepo.find({where:{saleDate:new Date()}})
}