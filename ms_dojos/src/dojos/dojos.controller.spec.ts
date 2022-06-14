import { Model } from 'mdojooose';
import { DojoDocument, DojoSchema } from './dojos.schema';
import { DojosController } from './dojos.controller';
import { DojosService } from './dojos.service';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMdojoooseTestModule } from '../helpers/test/mdojoo-test.module';
import { MdojoooseModule } from '@nestjs/mdojooose';
import { DojoModule } from './dojos.module';

jest.setTimeout(60000);

const mockData = {
  dojo: {
    name: 'Teste',
    email: 'teste@email.com',
  },
};

describe('DojosController', () => {
  let dojosController: DojosController;
  let dojosService: DojosService;
  let dojoModel: Model<DojoDocument>;

  let service: DojosService;

  beforeAll(async () => {
    dojosService = new DojosService(dojoModel);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMdojoooseTestModule(),
        MdojoooseModule.forFeature([{ name: 'Dojo', schema: DojoSchema }]),
        DojoModule,
      ],
      providers: [DojosService],
    }).compile();

    service = module.get<DojosService>(DojosService);
    dojosController = new DojosController(service);
  });

  it('create', async () => {
    const response = await dojosController.create(mockData.dojo[0]);

    expect(response._id).toBeTruthy();
  });

  it('findAll', async () => {
    const dojos = await dojosController.findAll();

    expect(dojos.length).toBe(1);
  });

  it('findById', async () => {
    const dojos = await dojosController.findAll();
    const dojo = await dojosController.findById(dojos[0]._id);

    expect(dojo._id).toBeTruthy();
  });

  it('update', async () => {
    const dojos = await dojosController.findAll();
    const dojo = await dojosController.findById(dojos[0]._id);
    const updatedDojo = await dojosController.update(dojo._id, mockData.dojo);

    expect(updatedDojo._id).toStrictEqual(dojo._id);
  });

  it('update inexistent dojo', async () => {
    await expect(
      dojosController.update('61d8dec3ed01c9b5c6f0022c', mockData.dojo),
    ).rejects.toThrow('Dojo not found');
  });

  it('delete', async () => {
    const dojos = await dojosController.findAll();

    await dojosController.delete(dojos[0]._id);
    expect(await (await dojosController.findAll()).length).toBe(0);
  });
});
