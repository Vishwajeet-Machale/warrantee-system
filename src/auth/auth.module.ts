import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stategy';
import { PrismaModule } from 'prisma/prisma.module';




@Module({
  imports: [
    PrismaModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET, // use value from .env
      signOptions:{expiresIn:process.env.JWT_SECRET_EXPIRY},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

