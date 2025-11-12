import { Router } from "express";
import { validateBody } from "../middlewares/body.validator.middleware";
import { addProductSchema, updateProductSchema } from "../validations/productValidations";
import { addProductController, deleteProductController, getAllProductsController, getProductByIdController, updateProductController, } from "../controllers/ProductController";

const productRoutes=Router()


productRoutes.post("/add",validateBody(addProductSchema),addProductController)
productRoutes.get("/",getAllProductsController)
productRoutes.post("/update",validateBody(updateProductSchema),updateProductController)
productRoutes.get("/:id",getProductByIdController)
productRoutes.delete("/:id",deleteProductController)

export default productRoutes