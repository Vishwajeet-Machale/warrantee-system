import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { OemModule } from './oem/oem.module';
import { ProductModule } from './product/product.module';
import { WarrantyModule } from './warranty/warranty.module';
import { AmcModule } from './amc/amc.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, OemModule, ProductModule, WarrantyModule, AmcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
