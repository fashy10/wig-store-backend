import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Attach this to any route that only your girlfriend should be able to hit,
// e.g. @UseGuards(JwtAuthGuard) above "add product" or "delete product".
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
