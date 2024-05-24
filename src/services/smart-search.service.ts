import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands, Cities, Diets, DishTypes } from 'src/models';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class SmartSearchService {
  constructor(
    @InjectRepository(DishTypes)
    private dishTypeModel: Repository<DishTypes>,
    @InjectRepository(Diets)
    private dietsModel: Repository<Diets>,
    @InjectRepository(Brands)
    private brandsModel: Repository<Brands>,
    @InjectRepository(Cities)
    private connection: Connection,
  ) {}

  async extractEntities(
    searchTerm: string,
    page: number = 1,
    pageSize: number = 100,
  ): Promise<any[]> {
    const words = searchTerm.split(' ');

    const entities = [];
    for (const word of words) {
      const offset = (page - 1) * pageSize;
      const result = await this.connection.query(
        `
        (SELECT 'city' as type, id, name FROM cities WHERE LOWER(name) LIKE  ? LIMIT ? OFFSET ?)
        UNION ALL
        (SELECT 'brand' as type, id, name FROM brands WHERE LOWER(name) LIKE ? LIMIT ? OFFSET ?)
        UNION ALL
        (SELECT 'dishType' as type, id, name FROM dish_types WHERE LOWER(name) LIKE ? LIMIT ? OFFSET ?)
        UNION ALL
        (SELECT 'diet' as type, id, name FROM diets WHERE LOWER(name) LIKE ? LIMIT ? OFFSET ?)
        `,
        [
          word,
          pageSize,
          offset,
          word,
          pageSize,
          offset,
          word,
          pageSize,
          offset,
          word,
          pageSize,
          offset,
        ],
      );

      entities.push(...result);
    }

    return entities;
  }
}
