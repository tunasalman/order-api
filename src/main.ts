import { Logger as NestLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
const logger = new NestLogger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const apiPrefix = 'api';
  const port = configService.get<number>('PORT');
  app.setGlobalPrefix(apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('Customer-Order API')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(port || 3000, () => {
    logger.log(`🚀  Server ready at http://localhost:${port}/${apiPrefix}`);

    logger.log(`🚀  Swagger ready at http://localhost:${port}/documentation`);
  });
}

bootstrap()
  .then(() => logger.log('All systems go'))
  .catch((e) => {
    logger.error(`❌  Error starting server, ${e}`);
  });
