import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CitiesService } from 'src/services';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesServices: CitiesService) {}

  @Get('add')
  async addAddress(@Body() payload: any) {
    return await this.citiesServices.createCity(payload);
  }
}
