import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApiResponse } from '../common/utils/response';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockUser = {
    id: 'user-id',
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    user_type: 'END_USER',
    role: { name: 'USER' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should return success response on register', async () => {
      (authService.register as jest.Mock).mockResolvedValue(mockUser);

      const result = await controller.register({ 
        ...mockUser, 
        password: 'pass123', 
        role_id: 1, 
        user_type: 'END_USER' as any // or import { UserType } and use UserType.END_USER
      });

      expect(result).toEqual(ApiResponse.success('Registration successful', mockUser));
    });

    it('should return error response on register failure', async () => {
      (authService.register as jest.Mock).mockRejectedValue(new Error('Registration error'));

      const result = await controller.register({ 
        ...mockUser, 
        password: 'pass123', 
        role_id: 1, 
        user_type: 'END_USER' as any // or import { UserType } and use UserType.END_USER 
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Registration failed');
    });
  });

  describe('login', () => {
    it('should return success response on login', async () => {
      (authService.login as jest.Mock).mockResolvedValue({
        user: mockUser,
        accessToken: 'mocked-token',
      });

      const result = await controller.login({ email: mockUser.email, password: 'password' });

      expect(result).toEqual(ApiResponse.success('Login successful', mockUser, 'mocked-token'));
    });

    it('should return error response on login failure', async () => {
      (authService.login as jest.Mock).mockRejectedValue(new Error('Invalid login'));

      const result = await controller.login({ email: mockUser.email, password: 'wrong' });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Login failed');
    });
  });
});

