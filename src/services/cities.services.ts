import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cities } from 'src/models';
import { Like, Repository } from 'typeorm';

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

  async findAll(): Promise<any> {
    const result = await this.cityModel.find();
    return result;
  }

  async findByName(term: string): Promise<any> {
    const results = await this.cityModel.find({
      where: { name: Like(term) },
    });

    console.log(results);
    return results;
  }
}
