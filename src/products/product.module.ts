import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { RawMaterialsModule } from "../rawMaterials/rawMaterials.module";
import { ProductController } from "./controllers/product.constoller";
import { ProductService } from "./services/product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product]),RawMaterialsModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [TypeOrmModule]
})
export class ProductModule { };