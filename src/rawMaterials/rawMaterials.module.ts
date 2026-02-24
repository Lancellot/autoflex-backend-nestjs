import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RawMaterial } from "./entities/rawMaterial.entity";
import { RawMaterialController } from "./controllers/rawMaterial.controller";
import { RawMaterialService } from "./services/rawMaterial.service";
import { Product } from "../products/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RawMaterial, Product])],
    controllers: [RawMaterialController],
    providers: [RawMaterialService],
    exports: [RawMaterialService],
})
export class RawMaterialsModule { }