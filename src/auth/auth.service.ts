import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException, Body, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(@Body() dto: RegisterDto) {
    try {
      
      const userExists = await this.prisma.user.findUnique({ where: { email: dto.email } });

      if (userExists) {
        throw new BadRequestException('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          phone: dto.phone,
          role_id: dto.role_id,
          user_type: dto.user_type,
          oem_account_id: dto.oem_account_id ?? null,
          service_agency_id: dto.service_agency_id ?? null,
        },
        include: { role: true },
      });
      return user
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(@Body() dto: LoginDto) {
    try {
      // const user = await this.prisma.user.findUnique({
      //   where: { email: dto.email },
      //   include: { role: true },
      // });

      const user = await this.prisma.user.findUnique({
  where: { email: dto.email },
  include: {
    role: {
      include: {
        roleFeatureAccesses: {
          include: {
            feature: true, // 💡 this is required to get feature.code
          },
        },
      },
    },
  },
});


      if (!user || !(await bcrypt.compare(dto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { access_token } = await this.generateToken(user);

      return {
        user,
        accessToken: access_token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  // private async generateToken(user: any) {
  //   const payload = { email: user.email, sub: user.id, role: user.role.name };
  //   const access_token = this.jwtService.sign(payload);
  //   return { access_token };
  // }

  private async generateToken(user: any) {
    console.log("user", user);
  const permissions = user.role.roleFeatureAccesses.map((access) => ({
    feature: access.feature.code,
    access: access.accessType,
  }));

  const payload = {
    id: user.id,
    email: user.email,
    oem_account_id: user.oem_account_id,
    service_agency_id: user.service_agency_id,
    user_type: user.user_type,
    role: user.role.name,
    role_id: user.role_id, 
    permissions,
  };

  const access_token = this.jwtService.sign(payload);
  return { access_token };
}

}
