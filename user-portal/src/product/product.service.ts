import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';
@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {
    }

    async all(): Promise<ProductDocument[]> {
        return this.productModel.find().exec();
    }

    async create(product: any): Promise<ProductDocument> {
        return new this.productModel(product).save();
    }

    async findOne(id: number): Promise<Product> {
        return this.productModel.findOne({ id })
    }

    async update(id: number, data: any): Promise<any> {
        return this.productModel.findOneAndUpdate({ id }, data);
    }

    async delete(id: number): Promise<void> {
        this.productModel.deleteOne({ id });
    }
}
