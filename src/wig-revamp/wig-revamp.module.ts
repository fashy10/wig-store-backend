import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WigRevampRequest, WigRevampRequestSchema } from './wig-revamp-request.schema';
import { WigRevampService } from './wig-revamp.service';
import { WigRevampController } from './wig-revamp.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WigRevampRequest.name, schema: WigRevampRequestSchema },
    ]),
    AuthModule,
  ],
  providers: [WigRevampService],
  controllers: [WigRevampController],
})
export class WigRevampModule {}
