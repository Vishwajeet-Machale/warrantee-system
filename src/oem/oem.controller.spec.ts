import { Test, TestingModule } from '@nestjs/testing';
import { OemController } from './oem.controller';

describe('OemController', () => {
  let controller: OemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OemController],
    }).compile();

    controller = module.get<OemController>(OemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
