import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // optional: makes PrismaService globally available
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
