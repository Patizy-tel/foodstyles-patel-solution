import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands, Cities, Diets, DishTypes } from 'src/models';
import { SearchDto } from 'src/models/dto';
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

  /*
  MY OPTIMAL SOLUTION
  */
  async extractEntities(
    searchTerm: SearchDto,
    page: number = 1,
    pageSize: number = 100,
  ): Promise<any[]> {
    const words = searchTerm.search.split(' ');

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
  /*

 END OF OPTIMAL SOLUTION

*/

  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   * the non optimal  solution
   */

  async searchEntities(searchTerm: string) {
    const entities = [];
    const entityTypes = {
      city: 'cities',
      brand: 'brands',
      dishType: 'dishTypes',
      diet: 'diets',
    };

    for (const entityType in entityTypes) {
      const keyword = entityTypes[entityType];
      const matches = await this.findMatchingEntities(searchTerm, keyword);

      if (matches.length > 0) {
        for (const match of matches) {
          entities.push({ [entityType]: match });
        }
      }
    }

    return entities;
  }

  // Helper function for fetching and filtering entities of a specific type
  async findMatchingEntities(searchTerm: string, keyword: string) {
    const terms = searchTerm.toLowerCase().split(' ');
    const regexPattern = new RegExp(
      terms.map((term) => `\\b${term}\\w*`).join('|'),
    );

    const matchingEntities = await this[`${keyword}Service`].findAll(); // Access service dynamically
    return matchingEntities.filter((entity) =>
      regexPattern.test(entity.name.toLowerCase()),
    );
  }
}
