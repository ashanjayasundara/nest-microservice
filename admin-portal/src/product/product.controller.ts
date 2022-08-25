import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from "@nestjs/microservices"
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService,
        @Inject("PRODUCT_SERVICE") private readonly client: ClientProxy
    ) {

    }

    @Get()
    all() {
        this.client.emit("hello", "sample data from admin terminal");
        return this.productService.all();
    }

    @Post()
    async create(@Body("title") title: string, @Body("image") image: string) {
        const product = await this.productService.create({ title, image });
        this.client.emit("PRODUCT_CREATED", product);
        return product;
    }

    @Put(":id")
    async update(@Param('id') id: number, @Body("title") title: string, @Body("image") image: string) {
        await this.productService.update(id, { title, image });
        const product = await this.productService.get(id);
        this.client.emit("PRODUCT_UPDATED", product);
        return product;
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        await this.productService.delete(id);
        this.client.emit("PRODUCT_DELETED", id);
    }

    @Post(":id/like")
    async like(@Param('id') id: number): Promise<any> {
        const product = await this.productService.get(id);
        product.likes++;
        return this.productService.update(id, {
            likes: product.likes + 1
        });
    }
}
