import { Model } from 'mongoose';
import { UserDocument, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from '../helpers/test/mongo-test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users.module';

jest.setTimeout(60000);

const mockData = {
  user: {
    name: 'Teste',
    email: 'teste@email.com',
  },
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let userModel: Model<UserDocument>;

  let service: UsersService;

  beforeAll(async () => {
    usersService = new UsersService(userModel);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        UserModule,
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersController = new UsersController(service);
  });

  it('create', async () => {
    const response = await usersController.create(mockData.user[0]);

    expect(response._id).toBeTruthy();
  });

  it('findAll', async () => {
    const users = await usersController.findAll();

    expect(users.length).toBe(1);
  });

  it('findById', async () => {
    const users = await usersController.findAll();
    const user = await usersController.findById(users[0]._id);

    expect(user._id).toBeTruthy();
  });

  it('update', async () => {
    const users = await usersController.findAll();
    const user = await usersController.findById(users[0]._id);
    const updatedUser = await usersController.update(user._id, mockData.user);

    expect(updatedUser._id).toStrictEqual(user._id);
  });

  it('update inexistent user', async () => {
    await expect(
      usersController.update('61d8dec3ed01c9b5c6f0022c', mockData.user),
    ).rejects.toThrow('User not found');
  });

  it('delete', async () => {
    const users = await usersController.findAll();

    await usersController.delete(users[0]._id);
    expect(await (await usersController.findAll()).length).toBe(0);
  });
});
