import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RawMaterial } from "./entities/rawMaterial.entity";
import { RawMaterialController } from "./controllers/rawMaterial.controller";
import { RawMaterialService } from "./services/rawMaterial.service";

@Module({
    imports: [TypeOrmModule.forFeature([RawMaterial])],
    controllers: [RawMaterialController],
    providers: [RawMaterialService],
    exports: [RawMaterialService],
})
export class RawMaterialsModule { }