import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Param, 
    ParseIntPipe, 
    Post, 
    Put, 
    Query 
} from "@nestjs/common";
import { RawMaterialService } from "../services/rawMaterial.service";
import { RawMaterial } from "../entities/rawMaterial.entity";

@Controller('/raw-materials')
export class RawMaterialController { 
    constructor(private readonly rawMaterialService: RawMaterialService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<RawMaterial[]> {
        return this.rawMaterialService.findAll();
    }

    // Exemplo: /raw-materials/ids?ids=1,2,3
    @Get('/ids')
    @HttpCode(HttpStatus.OK)
    findByIds(
        @Query('ids') ids: string
    ): Promise<RawMaterial[]> {
        const parsedIds = ids.split(',').map(id => Number(id));
        return this.rawMaterialService.findByIds(parsedIds);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<RawMaterial> {
        return this.rawMaterialService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body() rawMaterial: RawMaterial
    ): Promise<RawMaterial> {
        return this.rawMaterialService.create(rawMaterial);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() rawMaterial: RawMaterial
    ): Promise<RawMaterial> {
        return this.rawMaterialService.update({
            ...rawMaterial,
            id
        });
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.rawMaterialService.delete(id);
    }
}