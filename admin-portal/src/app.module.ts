import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'nest-admin-portal',
        autoLoadEntities:true, // ONLY IN DEV
        synchronize: true,
      }
    ),
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
