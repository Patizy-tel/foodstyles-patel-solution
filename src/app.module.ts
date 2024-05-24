import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CitiesController,
  DietsController,
  DishTypesController,
} from './controllers';
import { BrandsController } from './controllers/brands.controller';
import { Brands, Cities, Diets, DishTypes } from './models';
import {
  BrandsService,
  CitiesService,
  DietsService,
  DishTypesService,
} from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: Number.parseInt(configService.get<string>('DATABASE_PORT'), 10),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
        ssl: false,
      }),
    }),
    TypeOrmModule.forFeature([Cities]),
    TypeOrmModule.forFeature([Brands]),
    TypeOrmModule.forFeature([DishTypes]),
    TypeOrmModule.forFeature([Diets]),
  ],
  controllers: [
    AppController,
    BrandsController,
    CitiesController,
    DietsController,
    DishTypesController,
  ],
  providers: [
    AppService,
    CitiesService,
    DietsService,
    BrandsService,
    DishTypesService,
  ],
})
export class AppModule {}
