import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WigRevampRequestDocument = HydratedDocument<WigRevampRequest>;

export const REVAMP_STATUSES = [
  'New Request',
  'Under Review',
  'Awaiting Customer',
  'Price Sent',
  'Approved',
  'In Progress',
  'Ready',
  'Completed',
  'Cancelled',
] as const;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class WigRevampRequest {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  service: string; // e.g. "Full Wig Revamp", "Lace Revamp", "Restyling", ...

  @Prop()
  wigType: string; // Human Hair / Virgin Hair / Raw Hair / Synthetic / Not Sure

  @Prop()
  condition: string; // Lightly Used / Used / Heavily Used / Damaged

  @Prop()
  desiredStyle: string;

  @Prop()
  desiredColor: string;

  @Prop()
  notes: string;

  @Prop({ type: [String], default: [] })
  imageUrls: string[];

  @Prop()
  estimatedPrice: number;

  @Prop()
  finalPrice: number;

  @Prop({ default: 'New Request' })
  status: string;
}

export const WigRevampRequestSchema = SchemaFactory.createForClass(WigRevampRequest);
