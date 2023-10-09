import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // Postavite ovu vrednost na URL vašeg Angular aplikacije
    credentials: true, // Omogućite slanje kolačića (cookies) sa zahtevima ako je potrebno
  });
  await app.listen(3000);
}
bootstrap();
