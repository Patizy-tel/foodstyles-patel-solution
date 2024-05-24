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

  async searchEntities(searchTerm: any) {
    const extractedEntities: any = await this.extractEntities(
      searchTerm.search,
    );
    console.log(extractedEntities);
    // Query the database based on the extracted entities
    const cityResults = await this.cityModel.find({
      where: { name: extractedEntities.cities },
    });
    const brandResults = await this.brandsModel.find({
      where: { name: extractedEntities.brands },
    });
    const dishTypeResults = await this.dishTypeModel.find({
      where: { name: extractedEntities.dishTypes },
    });
    const dietResults = await this.dietsModel.find({
      where: { name: extractedEntities.diets },
    });

    return {
      cities: cityResults,
      brands: brandResults,
      dishTypes: dishTypeResults,
      diets: dietResults,
    };
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
      cities: await this.citiesService.findAll(),
      brands: await this.brandsService.findAll(),
      dishTypes: await this.dishTypesService.findAll(),
      diets: await this.dietsService.findAll(),
    };
    // console.log(data);
    for (const key of Object.keys(data)) {
      if (!data[key].length) {
        // If the value is empty, remove the key from the data object
        delete data[key];
      }
    }

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
