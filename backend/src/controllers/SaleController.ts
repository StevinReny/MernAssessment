import { NextFunction,Request,Response } from "express";
// import { SaleEntry } from "../entities/SaleEntry";
import { createNewSaleEntry, createNewSaleItemEntry, findAllBill, findSaleBillById, findtodayBill, updateSaleEntryPrice } from "../services/productservice";
import { SaleEntryRepo } from "../config/data-source";
// import { toASCII } from "punycode";
import { ApiError } from "../utils/apiError";
// import { compileFunction } from "vm";

export interface DataDetails{
    quantity:number,
    product_id:string,
    salePrice:number,
    product_name:string,
}

export const AddSaleEntry=async(req:Request,res:Response,next:NextFunction)=>{
    let newSaleEntry
    let totalPrice=0
    let discount=0
    try {
        const {saleDate,data} =req.body  
        console.log(req.body)
        const remove=data.shift()
        newSaleEntry=await createNewSaleEntry(saleDate)
        
            for(const element of data){
            const item=await createNewSaleItemEntry(element,newSaleEntry)
            
            console.log(item)
            totalPrice=totalPrice+(item.salePrice*item.quantity)
        };
         if(totalPrice>1000 && totalPrice<2000){
             discount=totalPrice*(1/100)
            totalPrice=totalPrice-discount
        }
        else if (totalPrice>2000){
             discount=totalPrice*(2/100)
            totalPrice=totalPrice-discount
        }
        else{
            totalPrice=totalPrice+0
        }
   
        const updated=await updateSaleEntryPrice(newSaleEntry,totalPrice,discount)

        return res.status(200).json({message:"Successfully inserted",info:updated})
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
       
        return res.status(200).json({message:"Successfully fetched",info:sale,price:totalPrice})
    } catch (error) {
        next(error)
    }
}

export const findAllBillController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        // console.log("hai")
        const result=await findAllBill()
        return res.status(200).json({message:"Success",info:result})
    } catch (error) {
        next(error)
    }
}

export const todaySaleController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result=await findtodayBill()
        console.log(result)
        return res.status(200).json({message:"Success",info:null})
    } catch (error) {
        next(error)
    }
}