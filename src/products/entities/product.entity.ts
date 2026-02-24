import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RawMaterial } from "../../rawMaterials/entities/rawMaterial.entity";

@Entity({ name: 'tb_products' })
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => RawMaterial, (rawMaterial) => rawMaterial.product)
    rawMaterial!: RawMaterial;
}