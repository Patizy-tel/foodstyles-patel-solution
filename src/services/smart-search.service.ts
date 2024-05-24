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
    const extractedEntities: any = this.extractEntities(searchTerm);

    const entities = await this.cityModel
      .createQueryBuilder('city')
      .innerJoinAndSelect('city.entity', 'entity')
      .innerJoinAndSelect('entity.brand', 'brand')
      .innerJoinAndSelect('entity.dishType', 'dishType')
      .innerJoinAndSelect('entity.diet', 'diet')
      .where('city.name IN (:cities)', { cities: extractedEntities.cities })
      .andWhere('brand.name IN (:brands)', { brands: extractedEntities.brands })
      .andWhere('dishType.name IN (:dishTypes)', {
        dishTypes: extractedEntities.dishTypes,
      })
      .andWhere('diet.name IN (:diets)', { diets: extractedEntities.diets })
      .getMany();

    return entities;
  }

  private async extractEntities(searchTerm: string) {
    const entities = [];

    // Mapping of keywords to entity types
    const entityTypes = {
      city: 'cities',
      brand: 'brands',
      dishType: 'dishTypes',
      diet: 'diets',
    };

    const data = {
      cities: [await this.citiesService.findAll()],
      brands: [await this.brandsService.findAll()],
      dishTypes: [await this.dishTypesService.findAll()],
      diets: [await this.dietsService.findAll()],
    };

    // Split the search term into individual words
    const terms = searchTerm.toLowerCase().split(' ');

    // Iterate through the entities to identify matches
    for (const entityType in entityTypes) {
      const keyword = entityTypes[entityType];
      const matches = data[keyword].filter((entity) =>
        terms.includes(entity.name.toLowerCase()),
      );

      if (matches.length > 0) {
        matches.forEach((match) => {
          const entityObj = { [entityType]: match };
          entities.push(entityObj);
        });
      }
    }

    return entities;
  }
}
