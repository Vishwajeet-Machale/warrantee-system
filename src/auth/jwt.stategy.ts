import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:process.env.JWT_SECRET, // Store in env
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
// This strategy extracts the JWT from the Authorization header and validates it.
// The `validate` method can be used to perform additional checks or return user information.
// Make sure to replace 'your_jwt_secret_key' with your actual secret key, ideally stored in an environment variable.
// This code is part of the authentication module in a NestJS application, specifically for handling JWT authentication.
// It is used to protect routes and ensure that only authenticated users can access certain endpoints.
// The strategy is registered in the main application module or a dedicated auth module.