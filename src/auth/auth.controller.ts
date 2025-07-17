import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/utils/response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.authService.register(dto);
      return ApiResponse.success('Registration successful', user);
    } catch (error) {
      return ApiResponse.error('Registration failed', error.message);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const { user, accessToken } = await this.authService.login(dto);
      return ApiResponse.success('Login successful', user, accessToken);
    } catch (error) {
      return ApiResponse.error('Login failed', error.message);
    }
  }
}

