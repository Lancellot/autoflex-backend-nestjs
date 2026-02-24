import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { ILike, Repository, DeleteResult } from 'typeorm';
import { RawMaterialService } from "../../rawMaterials/services/rawMaterial.service";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private readonly rawService: RawMaterialService,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find({
            relations: {
                rawMaterial: true
            }
        });
    }

    async findByid(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: {
                id
            },
            relations: {
                rawMaterial: true
            }
        });

        if (!product) {
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
        }
        return product;
    }

    async findByRawMaterial(rawMaterialId: number): Promise<Product[]> {
        await this.rawService.findById(rawMaterialId); // valida se existe

        return this.productRepository.find({
            where: {
                rawMaterial: { id: rawMaterialId }
            },
            relations: {
                rawMaterial: true
            }
        });
    }

    async findByName(name: string): Promise<Product[]> {
        return this.productRepository.find({
            where: {
                name: ILike(`%${name}%`)
            },
            relations: {
                rawMaterial: true
            }
        });
    }

    async create(product: Product): Promise<Product> {
        if (!product.rawMaterial?.id) {
            throw new BadRequestException('rawMaterial.id é obrigatório');
        }

        const rawMaterial = await this.rawService.findById(product.rawMaterial.id);

        if (!rawMaterial) {
            throw new NotFoundException(`RawMaterial com id ${product.rawMaterial.id} não encontrado`);
        }

        product.rawMaterial = rawMaterial;
        return this.productRepository.save(product);
    }

    async update(product: Product): Promise<Product> {
        const productUpdated = await this.findByid(product.id);
        const rawMaterial = await this.rawService.findById(product.rawMaterial.id);
        product.rawMaterial = rawMaterial;
        return this.productRepository.save(product);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findByid(id);
        return this.productRepository.delete(id);
    }
}