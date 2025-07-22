import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockUser = {
    id: 'user-id',
    name: 'Test User',
    email: 'test@example.com',
    password: '', // will be set in beforeEach
    phone: '1234567890',
    user_type: 'END_USER',
    role: { name: 'USER' },
  };

  beforeEach(async () => {
    mockUser.password = await bcrypt.hash('password123', 10);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.register({
        ...mockUser,
        password: 'password123',
        role_id: 1,
        user_type: 'END_USER' as any, // or import { UserType } and use UserType.END_USER
      });

      expect(result).toEqual(mockUser);
    });

    it('should throw error if email already exists', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        service.register({ ...mockUser, password: 'password123', role_id: 1, user_type: 'END_USER' as any }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should return token and user on valid login', async () => {
      const inputPassword = 'password123';
      const hashedPassword = await bcrypt.hash(inputPassword, 10);

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        password: hashedPassword,
      });

      const result = await service.login({ email: mockUser.email, password: inputPassword });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('user');
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.login({ email: 'wrong@example.com', password: 'invalid' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
