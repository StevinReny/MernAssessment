import { ProductRepo } from "../config/data-source"
import { Product } from "../entities/Product"
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