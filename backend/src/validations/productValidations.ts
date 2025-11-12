import { NextFunction } from "express";
import Joi from "joi";

export const addProductSchema=Joi.object({
    name: Joi.string().trim().min(3).required().messages({
            "string.base": "phone number should be a string",
            "string.empty": "phone number must contain a value",
            "string.min":"Minimum 3 charecters",
            "any.required": "phone number is a required field"
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
         "string.base": "phone number should be a string",
            "string.empty": "phone number must contain a value",
            "any.required": "phone number is a required field"
    }),

    name: Joi.string().trim().min(3).required().messages({
            "string.base": "phone number should be a string",
            "string.empty": "phone number must contain a value",
            "string.min":"Minimum 3 charecters",
            "any.required": "phone number is a required field"
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