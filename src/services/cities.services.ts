import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cities } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(Cities)
    private cityModel: Repository<Cities>,
  ) {}

  async createCity(cityInfo: any): Promise<any> {
    try {
      const newCity = await this.cityModel.create(cityInfo);
      await this.cityModel.save(newCity);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async populateCities(): Promise<any> {}
}
