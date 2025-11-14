import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cors from "cors"
import { findAllBillController, todaySaleController } from "./controllers/SaleController";
import { getProductCount } from "./controllers/ProductController";

const app = express();
app.use(express.json())

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});
app.use("/bill",findAllBillController)
app.use("/count",getProductCount)
app.use("/todayCount",todaySaleController)

app.use("/product",productRoutes)

app.use(errorHandler);

// app.use("/auth", authRoutes);

export default app;
