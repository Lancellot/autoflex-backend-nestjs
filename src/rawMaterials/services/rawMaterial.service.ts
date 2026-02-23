import { Repository, In, DeleteResult } from "typeorm";
import { RawMaterial } from "../entities/rawMaterial.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RawMaterialService {
    constructor(
        @InjectRepository(RawMaterial)
        private readonly rawMaterialRepository: Repository<RawMaterial>
    ) {}

    async findById(id: number): Promise<RawMaterial> {
        const rawMaterial = await this.rawMaterialRepository.findOne({
            where: { id }
        });

        if (!rawMaterial)
            throw new HttpException('Matéria-prima não encontrada!', HttpStatus.NOT_FOUND);

        return rawMaterial;
    }

    async findAll(): Promise<RawMaterial[]> {
        return await this.rawMaterialRepository.find();
    }

    async findByIds(ids: number[]): Promise<RawMaterial[]> {
        return await this.rawMaterialRepository.findBy({
            id: In(ids)
        });
    }

    async create(rawMaterial: RawMaterial): Promise<RawMaterial> {
        const newRawMaterial = this.rawMaterialRepository.create(rawMaterial);
        return await this.rawMaterialRepository.save(newRawMaterial);
    }

    async update(rawMaterial: RawMaterial): Promise<RawMaterial> {
        await this.findById(rawMaterial.id);
        return await this.rawMaterialRepository.save(rawMaterial);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.rawMaterialRepository.delete(id);
    }
}