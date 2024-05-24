import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands, Cities, Diets, DishTypes } from 'src/models';
import { Repository } from 'typeorm';
import {
  BrandsService,
  CitiesService,
  DietsService,
  DishTypesService,
} from '.';

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
    private cityModel: Repository<Cities>,
    private brandsService: BrandsService,
    private citiesService: CitiesService,
    private dietsService: DietsService,
    private dishTypesService: DishTypesService,
  ) {}

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
    const resultAfterFilter = matchingEntities.filter((entity) =>
      regexPattern.test(entity.name.toLowerCase()),
    );

    return resultAfterFilter;
  }
}
