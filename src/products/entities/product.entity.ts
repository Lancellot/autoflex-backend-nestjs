import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RawMaterial } from "../../rawMaterials/entities/rawMaterial.entity";

@Entity({ name: 'tb_products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    createdAt: Date;

    @ManyToOne(() => RawMaterial,(rawMaterial) => rawMaterial.product)
    rawMaterial: RawMaterial;
}