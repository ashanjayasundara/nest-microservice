import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix("api");

  // // app.enableCors({
  // //  origin:"" 
  // // })
  // await app.listen(3001);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://ashan:user123@localhost:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  })

  app.listen().then(() => {
    console.log('Microservice is listen')
  })
}
bootstrap();
