
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from "@nestjs/microservices";
import { ProductDocument } from './product.model';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {

    }

    @Get()
    async all(): Promise<ProductDocument[]> {
        return this.productService.all();
    }

    @Post(":id/like")
    async like(@Param('id') id: number): Promise<any> {
        const product = await this.productService.findOne(id);
        // this.httpService.post(`http://localhost:3000/api/products/${id}/like`).subscribe(res => {
        //     console.log(res);
        // })
        return this.productService.update(id, {
            likes: product.likes + 1
        });
    }

    @EventPattern("PRODUCT_CREATED")
    async productCreate(product: any) {
        await this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes,
        });
    }

    @EventPattern("PRODUCT_UPDATED")
    async productUpdate(product: any) {
        await this.productService.update(product.id, {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes,
        });
    }

    @EventPattern("PRODUCT_DELETED")
    async productDelete(id: number) {
        await this.productService.delete(id);
    }
}
