import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  // MongoDB's real ID field is called "_id" - this makes the API also
  // include a plain "id" field (matching what the frontend expects)
  // whenever a product is sent back as JSON.
  toJSON: { virtuals: true },
})
export class Product {
  @Prop({ required: true })
  name: string; // e.g. "Bone Straight 26-inch Lace Front"

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  imageUrl: string; // Cloudinary URL of the wig photo

  @Prop({ default: 'Uncategorized' })
  category: string; // e.g. "Lace Front", "Bob", "Closure", "Colored"

  @Prop({ default: true })
  inStock: boolean; // lets her hide sold-out wigs without deleting them
}

export const ProductSchema = SchemaFactory.createForClass(Product);
