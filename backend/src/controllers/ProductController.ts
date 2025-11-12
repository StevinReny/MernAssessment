import { NextFunction } from "express";
import {Request,Response} from "express"
import { createProduct, deleteProduct, findProductById, findProductByName, getAllProduct, updateProductService } from "../services/productservice";
import { ApiError } from "../utils/apiError";



export const addProductController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const{name,price,currentStock,taxPercentage}=req.body
    
        const existingName=await findProductByName(name);
    
        if(existingName){
            throw new ApiError("Same product name is available Try another",400)
        }

        const result=await createProduct(name,price,currentStock,taxPercentage)
        return res.status(201).json({message:"Successfully inserted",info:result})
    } catch (error) {
        next(error)
    }

}

export const getAllProductsController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const results=await getAllProduct()
        return res.status(200).json({message:"Successfully fetched",info:results})
    } catch (error) {
        next(error)
    }
}


export const updateProductController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        
        
        const {id,name,price,currentStock,taxPercentage}=req.body
        const product=await findProductById(id)
    
        if(!product){
            throw new ApiError("Product cannot be found",404)
        }
        if(product.name===name && product.price===price && product.currentStock===currentStock && product.taxPercentage===taxPercentage){
            throw new ApiError("No change have been made",400)
        }
        const updated=await updateProductService(product,name,price,currentStock,taxPercentage)
        return res.status(200).json({messae:"Successfuly updated",info:updated})
    } catch (error) {
        next(error)
    }

}

export const getProductByIdController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=req.params.id
        const product=await findProductById(id)
        if(!product){
            throw new ApiError("The product cannot be found")
        }
        return res.status(200).json({message:"Successfully updated",info:product})
    } catch (error) {
        next(error)
    }
}

export const deleteProductController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=req.params.id
        const deleted=await deleteProduct(id)

        // console.log(deleted)
        return res.status(200).json({message:"Successfully deleted",info:deleted})
    } catch (error) {
        next(error)
    }
}