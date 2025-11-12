import { Router } from "express";
import { validateBody } from "../middlewares/body.validator.middleware";
import { addProductSchema, prdouctEntrySchema, updateProductSchema } from "../validations/productValidations";
import { addProductController, deleteProductController, getAllProductsController, getProductByIdController, updateProductController, } from "../controllers/ProductController";
import { addProductEntryController } from "../controllers/ProductEntryController";

const productRoutes=Router()


productRoutes.post("/add",validateBody(addProductSchema),addProductController)
productRoutes.get("/",getAllProductsController)
productRoutes.post("/update",validateBody(updateProductSchema),updateProductController)
productRoutes.get("/:id",getProductByIdController)
productRoutes.delete("/:id",deleteProductController)
productRoutes.post("/entry",validateBody(prdouctEntrySchema),addProductEntryController)

export default productRoutes