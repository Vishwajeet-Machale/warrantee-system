import { Module } from '@nestjs/common';
import { OemService } from './oem.service';
import { OemController } from './oem.controller';

@Module({
  providers: [OemService],
  controllers: [OemController]
})
export class OemModule {}
