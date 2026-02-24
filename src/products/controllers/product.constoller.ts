import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { ProductService } from "../services/product.service";

@Controller('/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: number): Promise<Product> {
        return this.productService.findByid(id);
    }

    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    async findByName(@Param('name') name: string): Promise<Product[]> {
        return this.productService.findByName(name);
    }

    @Get('/raw-material/:rawMaterialId')
    @HttpCode(HttpStatus.OK)
    async findByRawMaterial(@Param('rawMaterialId') rawMaterialId: number): Promise<Product[]> {
        return this.productService.findByRawMaterial(rawMaterialId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() product: Product): Promise<Product> {  // ✅ @Body() adicionado
        return this.productService.create(product);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() product: Product): Promise<Product> {  // ✅ @Body() adicionado
        return this.productService.update(product);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number): Promise<void> {
        await this.productService.delete(id);
    }
}