import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

// There's only ever ONE admin account for this site: your girlfriend's.
// Her email + password live in the .env file, not in a database table -
// no need for a full user management system for a single-owner store.
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const validEmail = dto.email === process.env.ADMIN_EMAIL;
    const validPassword = dto.password === process.env.ADMIN_PASSWORD;

    if (!validEmail || !validPassword) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const token = this.jwtService.sign({ sub: 'admin', email: dto.email });
    return { access_token: token };
  }
}
