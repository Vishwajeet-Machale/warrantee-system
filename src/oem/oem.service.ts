import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOemDto } from './dto/create-oem.dto';
import * as bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';

@Injectable()
export class OemService {
  constructor(private readonly prisma: PrismaService) {}

  async createOem(dto: CreateOemDto) {
    try {
      // 1. Check for duplicate email
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.admin_email },
      });
      if (existing) throw new ConflictException('Admin email already exists');

      // 2. Create OEM Account
      const oem = await this.prisma.oemAccount.create({
        data: {
          company_name: dto.company_name,
          gst_number: dto.gst_number,
          contact_email: dto.contact_email,
          support_number: dto.support_number,
          address: dto.address,
          created_by: dto.created_by,
        },
      });

      // 3. Create Role (if not exists)
      let role = await this.prisma.role.findFirst({
        where: { name: dto.role_name, oem_account_id: oem.id },
      });

      if (!role) {
        role = await this.prisma.role.create({
          data: {
            name: dto.role_name,
            oem_account_id: oem.id,
          },
        });
      }

      // 4. Assign features to Role
      for (const feature of dto.features) {
        await this.prisma.roleFeatureAccess.upsert({
          where: {
            roleId_featureId: {
              roleId: role.id,
              featureId: feature.featureId,
            },
          },
          update: { accessType: feature.accessType },
          create: {
            roleId: role.id,
            featureId: feature.featureId,
            accessType: feature.accessType,
          },
        });
      }

      // 5. Create Admin User
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const adminUser = await this.prisma.user.create({
        data: {
          name: dto.admin_name,
          email: dto.admin_email,
          phone: dto.admin_phone,
          password: hashedPassword,
          user_type: UserType.OEM,
          role_id: role.id,
          oem_account_id: oem.id,
        },
      });

      // 6. Create OEM Profile
      await this.prisma.oemUserProfile.create({
        data: {
          userId: adminUser.id,
          designation: 'OEM Admin',
          employeeId: `EMP-${Date.now()}`,
        },
      });

      return { oem, adminUser };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Error creating OEM');
    }
  }
}

