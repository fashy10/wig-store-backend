import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { uploadImageBuffer } from '../config/supabase';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // Public - anyone browsing the store sees only in-stock wigs
  findAllPublic() {
    return this.productModel.find({ inStock: true }).sort({ createdAt: -1 }).exec();
  }

  // Admin - she sees everything, including sold-out wigs, to manage them
  findAllForAdmin() {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Wig not found');
    return product;
  }

  async create(dto: CreateProductDto, imageBuffer?: Buffer) {
    const imageUrl = imageBuffer ? await uploadImageBuffer(imageBuffer) : undefined;
    const product = new this.productModel({ ...dto, imageUrl });
    return product.save();
  }

  async update(id: string, dto: UpdateProductDto, imageBuffer?: Buffer) {
    const product = await this.findOne(id);
    if (imageBuffer) {
      product.imageUrl = await uploadImageBuffer(imageBuffer);
    }
    Object.assign(product, dto);
    return product.save();
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return product.deleteOne();
  }
}
