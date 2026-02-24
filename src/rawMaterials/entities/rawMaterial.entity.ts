import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'tb_raw_materials' })
export class RawMaterial {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Product, (product) => product.rawMaterial, {
        onDelete: 'CASCADE',
        nullable: true
    })
    product: Product[];
}