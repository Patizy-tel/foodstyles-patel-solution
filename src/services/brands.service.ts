import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands } from 'src/models';
import { Like, Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands)
    private brandsModel: Repository<Brands>,
  ) {}

  async createBrand(brandInfo: any): Promise<any> {
    try {
      const newBrand = await this.brandsModel.create(brandInfo);
      await this.brandsModel.save(newBrand);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<any> {
    const result = await this.brandsModel.find();
    return result;
  }

  async findByName(
    term: string,
    page?: number,
    pageSize?: number,
  ): Promise<any> {
    const results = await this.brandsModel.find({
      where: { name: Like(term) },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return results;
  }
}
