import { NextFunction,Request,Response } from "express";
import { createProductEntry, findProductById } from "../services/productservice";
import { ApiError } from "../utils/apiError";

export const addProductEntryController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {product_id,quantity,purchasePrice,purchaseDate}=req.body

        const product=await findProductById(product_id)

        if(!product){
            throw new ApiError("The product cannot be found",404)
        }

        const newEntry=await createProductEntry(product,quantity,purchaseDate,purchasePrice)
        return res.status(200).json({message:"New product inserted",info:newEntry})
        
    } catch (error) {
        next(error)
    }
}