import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diets } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class DietsService {
  constructor(
    @InjectRepository(Diets)
    private dietsModel: Repository<Diets>,
  ) {}

  async createDiet(dietInfo: any): Promise<any> {
    try {
      const newDiet = await this.dietsModel.create(dietInfo);
      await this.dietsModel.save(newDiet);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<any> {
    const result = await this.dietsModel.find();
    return result;
  }
}
