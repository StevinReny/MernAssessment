import { NextFunction,Request,Response } from "express";
// import { SaleEntry } from "../entities/SaleEntry";
import { createNewSaleEntry, createNewSaleItemEntry, findAllBill, findSaleBillById, updateSaleEntryPrice } from "../services/productservice";
import { SaleEntryRepo } from "../config/data-source";
// import { toASCII } from "punycode";
import { ApiError } from "../utils/apiError";
// import { compileFunction } from "vm";

export interface DataDetails{
    quantity:number,
    product_id:string,
    salePrice:number
}

export const AddSaleEntry=async(req:Request,res:Response,next:NextFunction)=>{
    let newSaleEntry
    // let totalPrice=0
    try {
        const {saleDate,data} =req.body  
        newSaleEntry=await createNewSaleEntry(saleDate)
        data.forEach(async(element) => {
            const item=await createNewSaleItemEntry(element,newSaleEntry)

            console.log(item)
            // totalPrice=totalPrice+item.salePrice
        });
        
        // console.log(newSaleEntry)
        // console.log(totalPrice)
        // const updated=await updateSaleEntryPrice(newSaleEntry,totalPrice)

        return res.status(200).json({message:"Successfully inserted",info:newSaleEntry})
    } catch (error) {
        await SaleEntryRepo.remove(newSaleEntry)
        next(error)
    }
}

export const findSaleEntry=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let totalPrice=0
        const id=req.params.id
        console.log(id)
        const sale=await findSaleBillById(id)
        // console.log(sale)
        if(!sale){
            throw new ApiError("The Sale id is not valid")
        }
        sale.saleItems.forEach(item=>{
            totalPrice=totalPrice+item.salePrice
        })
        console.log(totalPrice)
        sale.totalPrice=totalPrice
        await SaleEntryRepo.save(sale)
        return res.status(200).json({message:"Successfully fetched",info:sale,price:totalPrice})
    } catch (error) {
        next(error)
    }
}

export const findAllBillController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log("hai")
        const result=await findAllBill()
        return res.status(200).json({message:"Success",info:result})
    } catch (error) {
        next(error)
    }
}