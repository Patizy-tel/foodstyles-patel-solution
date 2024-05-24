import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DietsService } from 'src/services';

@ApiTags('Diets')
@Controller('diets')
export class DietsController {
  constructor(private readonly dietsService: DietsService) {}

  @Post('add')
  async addDiet(@Body() payload: any) {
    return await this.dietsService.createDiet(payload);
  }
}
