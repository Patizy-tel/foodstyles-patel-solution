import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DishTypesService } from 'src/services';

@ApiTags('Dish-Types')
@Controller('Dish-Types')
export class DishTypesController {
  constructor(private readonly dishTyoesServices: DishTypesService) {}

  @Post('add')
  async addDishTypes(@Body() payload: any) {
    return await this.dishTyoesServices.createDishTypes(payload);
  }
}
