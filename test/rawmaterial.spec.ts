import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { RawMaterialController } from '../src/rawMaterials/controllers/rawMaterial.controller';
import { RawMaterialService } from '../src/rawMaterials/services/rawMaterial.service';

const mockRawMaterial = {
    id: 1,
    name: 'Steel',
    description: 'High quality steel',
    product: []
};

const mockRawMaterialService = {
    findAll: jest.fn().mockResolvedValue([mockRawMaterial]),
    findById: jest.fn().mockResolvedValue(mockRawMaterial),
    create: jest.fn().mockResolvedValue(mockRawMaterial),
    update: jest.fn().mockResolvedValue(mockRawMaterial),
    delete: jest.fn().mockResolvedValue({ affected: 1 })
};

describe('RawMaterialController', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RawMaterialController],
            providers: [
                {
                    provide: RawMaterialService,
                    useValue: mockRawMaterialService
                }
            ]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('GET /raw-materials - should return all raw materials', async () => {
        const response = await request(app.getHttpServer())
            .get('/raw-materials')
            .expect(200);

        expect(response.body).toEqual([mockRawMaterial]);
        expect(mockRawMaterialService.findAll).toHaveBeenCalled();
    });

    it('GET /raw-materials/:id - should return a raw material by id', async () => {
        const response = await request(app.getHttpServer())
            .get('/raw-materials/1')
            .expect(200);

        expect(response.body).toEqual(mockRawMaterial);
        expect(mockRawMaterialService.findById).toHaveBeenCalledWith(1);
    });

    it('POST /raw-materials - should create a raw material', async () => {
        const response = await request(app.getHttpServer())
            .post('/raw-materials')
            .send({ name: 'Steel', description: 'High quality steel' })
            .expect(201);

        expect(response.body).toEqual(mockRawMaterial);
        expect(mockRawMaterialService.create).toHaveBeenCalled();
    });

    it('PUT /raw-materials/:id - should update a raw material', async () => {
        const response = await request(app.getHttpServer())
            .put('/raw-materials/1')
            .send({ name: 'Updated Steel', description: 'Updated description' })
            .expect(200);

        expect(response.body).toEqual(mockRawMaterial);
        expect(mockRawMaterialService.update).toHaveBeenCalledWith({
            id: 1,
            name: 'Updated Steel',
            description: 'Updated description'
        });
    });

    it('DELETE /raw-materials/:id - should delete a raw material', async () => {
        await request(app.getHttpServer())
            .delete('/raw-materials/1')
            .expect(204);

        expect(mockRawMaterialService.delete).toHaveBeenCalledWith(1);
    });
});