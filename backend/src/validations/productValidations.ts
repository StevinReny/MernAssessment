import { NextFunction } from "express";
import Joi from "joi";

export const addProductSchema=Joi.object({
    name: Joi.string().trim().min(3).required().messages({
            "string.base": "Name should be a string",
            "string.empty": "Name must contain a value",
            "string.min":"Minimum 3 charecters",
            "any.required": "Name is a required field"
        }),
    price:Joi.number().positive().min(1).required().messages({
        "number.min":"Minimum price is 1",
        "number.empty":"Price cannot be empty",
        "any.required":"Price is a required field",
    }),
    currentStock:Joi.number().integer().min(0).optional().messages({
        "number.min":"Stock should be minimum 0"
    }),
    taxPercentage:Joi.number().positive().required().messages({
        "number.positive":"Tax should be positive",
        "number.empty":"Tax cannot be empty",
        "any.required":"Tax is a required field",
    })

})

export const updateProductSchema=Joi.object({
    id:Joi.string().trim().required().messages({
         "string.base": "Product id should be a string",
            "string.empty": "Product id must contain a value",
            "any.required": "Product id is a required field"
    }),

    name: Joi.string().trim().min(3).required().messages({
            "string.base": "Name should be a string",
            "string.empty": "Name must contain a value",
            "string.min":"Minimum 3 charecters",
            "any.required": "Name is a required field"
        }),
    price:Joi.number().positive().min(1).required().messages({
        "number.min":"Minimum price is 1",
        "number.empty":"Price cannot be empty",
        "any.required":"Price is a required field",
    }),
    currentStock:Joi.number().integer().min(0).optional().messages({
        "number.min":"Stock should be minimum 0"
    }),
    taxPercentage:Joi.number().positive().required().messages({
        "number.positive":"Tax should be positive",
        "number.empty":"Tax cannot be empty",
        "any.required":"Tax is a required field",
    })

})


export const prdouctEntrySchema=Joi.object({
    product_id:Joi.string().trim().required().messages({
         "string.base": "Product id should be a string",
            "string.empty": "Product id must contain a value",
            "any.required": "Product id is a required field"
    }),
    quantity:Joi.number().integer().min(1).required().messages({
        "number.min":"Quantity should be minimum 1",
        "number.empty":"Quantity cannot be empty",
        "any.required":"Quantity is a required field"
    }),
    purchaseDate:Joi.date().required().messages({
        "date.base":"Date should be valid",
        "date.empty":"Date cannot be empty",
        "any.required":"Date is required field",
    }),
    purchasePrice:Joi.number().positive().min(1).required().messages({
        "number.min":"Minimum price is 1",
        "number.empty":"Price cannot be empty",
        "any.required":"Price is a required field",
    }),
})