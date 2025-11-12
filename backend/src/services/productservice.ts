import { ProductEntryRepo, ProductRepo } from "../config/data-source"
import { Product } from "../entities/Product"
import { ProductEntry } from "../entities/ProductEntry";
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