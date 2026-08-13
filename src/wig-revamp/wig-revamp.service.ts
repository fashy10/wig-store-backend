import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  WigRevampRequest,
  WigRevampRequestDocument,
} from './wig-revamp-request.schema';
import { CreateWigRevampRequestDto, UpdateWigRevampRequestDto } from './wig-revamp.dto';
import { uploadImageBuffer } from '../config/supabase';

@Injectable()
export class WigRevampService {
  constructor(
    @InjectModel(WigRevampRequest.name)
    private requestModel: Model<WigRevampRequestDocument>,
  ) {}

  async create(dto: CreateWigRevampRequestDto, imageBuffers: Buffer[]) {
    const imageUrls = await Promise.all(imageBuffers.map((buf) => uploadImageBuffer(buf)));
    const request = new this.requestModel({ ...dto, imageUrls });
    return request.save();
  }

  // Admin-only - the full queue of revamp requests, newest first
  findAllForAdmin() {
    return this.requestModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const request = await this.requestModel.findById(id).exec();
    if (!request) throw new NotFoundException('Request not found');
    return request;
  }

  async update(id: string, dto: UpdateWigRevampRequestDto) {
    const request = await this.findOne(id);
    Object.assign(request, dto);
    return request.save();
  }
}
