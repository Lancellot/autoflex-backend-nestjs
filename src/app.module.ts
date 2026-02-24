import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './rawMaterials/entities/rawMaterial.entity';
import { RawMaterialsModule } from './rawMaterials/rawMaterials.module';
import { Product } from './products/entities/product.entity';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_autoflex',
      entities: [RawMaterial,Product],
      synchronize: true,
    }),
    RawMaterialsModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
