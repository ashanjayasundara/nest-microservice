import { Module, } from '@nestjs/common';
import { HttpModule,HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [HttpModule, MongooseModule.forRoot('mongodb://localhost:27017/user_portal', {
    autoCreate: true,
  }), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
