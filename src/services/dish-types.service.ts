import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DishTypes } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class DishTypesService {
  constructor(
    @InjectRepository(DishTypes)
    private dishTypeModel: Repository<DishTypes>,
  ) {}

  async createDishTypes(dishTypeInfo: any): Promise<any> {
    try {
      const newCity = await this.dishTypeModel.create(dishTypeInfo);
      await this.dishTypeModel.save(newCity);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async populateDishTypes(): Promise<any> {}
}
