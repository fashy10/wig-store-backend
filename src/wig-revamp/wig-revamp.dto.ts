import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { REVAMP_STATUSES } from './wig-revamp-request.schema';

export class CreateWigRevampRequestDto {
  @IsString()
  @MinLength(2)
  customerName: string;

  @IsString()
  @MinLength(5)
  phoneNumber: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  service: string;

  @IsString()
  @IsOptional()
  wigType?: string;

  @IsString()
  @IsOptional()
  condition?: string;

  @IsString()
  @IsOptional()
  desiredStyle?: string;

  @IsString()
  @IsOptional()
  desiredColor?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateWigRevampRequestDto {
  @IsIn(REVAMP_STATUSES)
  @IsOptional()
  status?: string;

  @Type(() => Number)
  @IsOptional()
  estimatedPrice?: number;

  @Type(() => Number)
  @IsOptional()
  finalPrice?: number;
}
