import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandsService } from 'src/services';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post('add')
  async addAddress(@Body() payload: any) {
    return await this.brandsService.createBrand(payload);
  }
}
