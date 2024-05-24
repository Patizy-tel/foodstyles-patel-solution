import { Test, TestingModule } from '@nestjs/testing';
import { SmartSearchService } from './smart-search.service';
import { BrandsService, CitiesService, DietsService, DishTypesService } from './';
import { Brands, Cities, Diets, DishTypes } from 'src/models';
import { Repository } from 'typeorm';

describe('SmartSearchService', () => {
  let smartSearchService: SmartSearchService;
  let brandsService: BrandsService;
  let citiesService: CitiesService;
  let dietsService: DietsService;
  let dishTypesService: DishTypesService;
  let brandsModel: Repository<Brands>;
  let citiesModel: Repository<Cities>;
  let dietsModel: Repository<Diets>;
  let dishTypesModel: Repository<DishTypes>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmartSearchService,
        BrandsService,
        CitiesService,
        DietsService,
        DishTypesService,
        {
          provide: 'BrandsService',
          useValue: {},
        },
        {
          provide: 'CitiesService',
          useValue: {},
        },
        {
          provide: 'DietsService',
          useValue: {},
        },
        {
          provide: 'DishTypesService',
          useValue: {},
        },
        {
          provide: 'BrandsModel',
          useValue: {},
        },
        {
          provide: 'CitiesModel',
          useValue: {},
        },
        {
          provide: 'DietsModel',
          useValue: {},
        },
        {
          provide: 'DishTypesModel',
          useValue: {},
        },
      ],
    }).compile();

    smartSearchService = module.get<SmartSearchService>(SmartSearchService);
    brandsService = module.get<BrandsService>(BrandsService);
    citiesService = module.get<CitiesService>(CitiesService);
    dietsService = module.get<DietsService>(DietsService);
    dishTypesService = module.get<DishTypesService>(DishTypesService);
    brandsModel = module.get<Repository<Brands>>(BrandsModel);
    citiesModel = module.get<Repository<Cities>>(CitiesModel);
    dietsModel = module.get<Repository<Diets>>(DietsModel);
    dishTypesModel = module.get<Repository<DishTypes>>(DishTypesModel);
  });

  it('should return entities matching the search term', async () => {
    // Create mock entities for testing
    const mockBrands = [
      { id: 1, name: 'Brand A' },
      { id: 2, name: 'Brand B' },
    ];
    const mockCities = [
      { id: 1, name: 'City A' },
      { id: 2, name: 'City B' },
    ];
    const mockDiets = [
      { id: 1, name: 'Diet A' },
      { id: 2, name: 'Diet B' },
    ];
    const mockDishTypes = [
      { id: 1, name: 'Dish Type A' },
      { id: 2, name: 'Dish Type B' },
    ];

    // Mock the service methods to return the mock entities
    jest.spyOn(brandsService, 'findAll').mockResolvedValue(mockBrands);
    jest.spyOn(citiesService, 'findAll').mockResolvedValue(mockCities);
    jest.spyOn(dietsService, 'findAll').mockResolvedValue(mockDiets);
    jest.spyOn(dishTypesService, 'findAll').mockResolvedValue(mockDiets);

    // Call the method to be tested
    const searchTerm = 'search';
    const entities = await smartSearchService.searchEntities(searchTerm);

    // Assert that the expected entities are returned
    expect(entities).toEqual([
      { city: mockCities[0] },
      { city: mockCities[1] },
      { diet: mockDiets[0] },
      { diet: mockDiets[1] },
      { dishType: mockDishTypes[0] },
      { dishType: mockDishTypes[1] },
    ]);
  });
});