import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands } from 'src/models';
import { Repository } from 'typeorm';

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

  async populateBrands(): Promise<any> {
    const brandsList = [
      {
        id: 1,
        name: 'Costa Coffee',
      },
      {
        id: 2,
        name: 'Greggs',
      },
      {
        id: 3,
        name: 'Subway',
      },
      {
        id: 4,
        name: "McDonald's",
      },
      {
        id: 5,
        name: 'KFC',
      },
      {
        id: 6,
        name: 'Greene King',
      },
      {
        id: 7,
        name: 'Wetherspoon',
      },
      {
        id: 8,
        name: 'Caffé Nero',
      },
      {
        id: 9,
        name: 'Burger King',
      },
      {
        id: 10,
        name: 'Pizza Hut',
      },
      {
        id: 11,
        name: 'Pret A Manger',
      },
      {
        id: 12,
        name: 'PizzaExpress',
      },
      {
        id: 13,
        name: 'Hungry Horse',
      },
      {
        id: 14,
        name: 'Lounges',
      },
      {
        id: 15,
        name: 'Sushi Daily',
      },
      {
        id: 16,
        name: 'Five Guys',
      },
      {
        id: 17,
        name: 'Chef & Brewer Collection',
      },
      {
        id: 18,
        name: "Gail's",
      },
      {
        id: 19,
        name: 'Zizzi',
      },
      {
        id: 20,
        name: 'Taco Bell',
      },
      {
        id: 21,
        name: 'Creams',
      },
      {
        id: 22,
        name: 'Coffee#1',
      },
      {
        id: 23,
        name: 'Prezzo',
      },
      {
        id: 24,
        name: "Morley's",
      },
      {
        id: 25,
        name: 'Favorite',
      },
      {
        id: 26,
        name: 'Chaiiwala',
      },
      {
        id: 27,
        name: 'Cote',
      },
      {
        id: 28,
        name: 'Panku',
      },
      {
        id: 29,
        name: 'Itsu',
      },
      {
        id: 30,
        name: "Kaspa's Desserts",
      },
      {
        id: 31,
        name: 'Fridays',
      },
      {
        id: 32,
        name: 'Poundbakery',
      },
      {
        id: 33,
        name: 'Kokoro',
      },
      {
        id: 34,
        name: 'Bella Italia',
      },
      {
        id: 35,
        name: 'Chopstix',
      },
      {
        id: 36,
        name: 'JOE & THE JUICE',
      },
      {
        id: 37,
        name: 'Tortilla',
      },
      {
        id: 38,
        name: 'Franco Manca',
      },
      {
        id: 39,
        name: 'Tops Pizza',
      },
      {
        id: 40,
        name: 'Ask Italian',
      },
      {
        id: 41,
        name: 'Farmhouse Inns',
      },
      {
        id: 42,
        name: 'Wimpy',
      },
      {
        id: 43,
        name: 'Muffin Break',
      },
      {
        id: 44,
        name: 'Black Sheep Coffee',
      },
      {
        id: 45,
        name: 'Turtle Bay',
      },
      {
        id: 46,
        name: 'Giggling Squid',
      },
      {
        id: 47,
        name: 'Heavenly Desserts',
      },
      {
        id: 48,
        name: "Sam's Chicken",
      },
      {
        id: 49,
        name: 'Tim Hortons',
      },
      {
        id: 50,
        name: 'Wildwood',
      },
      {
        id: 51,
        name: 'Las Iguanas',
      },
      {
        id: 52,
        name: 'Parsons Bakery',
      },
      {
        id: 53,
        name: 'Wasabi',
      },
      {
        id: 54,
        name: 'Chicken Cottage',
      },
      {
        id: 55,
        name: 'Pho',
      },
      {
        id: 56,
        name: 'Revolution',
      },
      {
        id: 57,
        name: 'Brunning & Price',
      },
      {
        id: 58,
        name: 'Gourmet Burger Kitchen (GBK)',
      },
      {
        id: 59,
        name: 'Honest Burgers',
      },
      {
        id: 60,
        name: 'Selekt Chicken',
      },
      {
        id: 61,
        name: "Auntie Anne's",
      },
      {
        id: 62,
        name: 'Coco Di Mama',
      },
      {
        id: 63,
        name: 'Bakers + Baristas',
      },
      {
        id: 64,
        name: 'Thomas The Baker',
      },
      {
        id: 65,
        name: 'Farmhouse Pizza',
      },
      {
        id: 66,
        name: 'Ole & Steen',
      },
      {
        id: 67,
        name: 'Coughlans',
      },
      {
        id: 68,
        name: 'Dixy Chicken',
      },
      {
        id: 69,
        name: 'Patisserie Valerie',
      },
      {
        id: 70,
        name: "Carluccio's",
      },
      {
        id: 71,
        name: 'Chicken Valley',
      },
      {
        id: 72,
        name: "Rio's Piri Piri",
      },
      {
        id: 73,
        name: 'The Botanist',
      },
      {
        id: 74,
        name: 'Chesters',
      },
      {
        id: 75,
        name: 'Galloways',
      },
      {
        id: 76,
        name: 'Browns Restaurant',
      },
      {
        id: 77,
        name: 'fishnchickn',
      },
      {
        id: 78,
        name: 'Herbies Pizza',
      },
      {
        id: 79,
        name: 'Pizza 2 Night',
      },
      {
        id: 80,
        name: "Mother Hubbard's",
      },
      {
        id: 81,
        name: 'Chicken World',
      },
      {
        id: 82,
        name: 'Dicksons',
      },
      {
        id: 83,
        name: 'Comptoir Libanais',
      },
      {
        id: 84,
        name: 'Amigos',
      },
      {
        id: 85,
        name: 'The Coffee House',
      },
      {
        id: 86,
        name: 'Super Pizza',
      },
      {
        id: 87,
        name: "Freddy's",
      },
      {
        id: 88,
        name: 'Piccolino',
      },
      {
        id: 89,
        name: 'Cheatmeals',
      },
      {
        id: 90,
        name: 'Peri Peri Original',
      },
      {
        id: 91,
        name: 'Mr. Pretzels',
      },
      {
        id: 92,
        name: 'Staniforths',
      },
      {
        id: 93,
        name: 'Kebabish Original',
      },
      {
        id: 94,
        name: 'Mr. Cod',
      },
      {
        id: 95,
        name: 'Dolci',
      },
      {
        id: 96,
        name: "Batch'd",
      },
      {
        id: 97,
        name: "Big John's",
      },
      {
        id: 98,
        name: 'Bistrot Pierre',
      },
      {
        id: 99,
        name: 'Treatz',
      },
      {
        id: 100,
        name: 'Shakehouse',
      },
      {
        id: 101,
        name: 'Bewiched',
      },
      {
        id: 102,
        name: 'Chatime',
      },
      {
        id: 103,
        name: 'Island Poke',
      },
      {
        id: 104,
        name: 'Tuk Tuk Pan Asian & Rayu Pan Asian',
      },
      {
        id: 105,
        name: 'Caspian Pizza',
      },
      {
        id: 106,
        name: 'Brasserie Blanc',
      },
      {
        id: 107,
        name: 'Shake Shack',
      },
      {
        id: 108,
        name: 'TGF Pizza',
      },
      {
        id: 109,
        name: 'Paya',
      },
      {
        id: 110,
        name: 'Gusto Italian',
      },
      {
        id: 111,
        name: 'Insomnia',
      },
      {
        id: 112,
        name: 'Karak Chaii',
      },
      {
        id: 113,
        name: 'Revolucion de Cuba',
      },
      {
        id: 114,
        name: 'Hillier',
      },
      {
        id: 115,
        name: 'Flat Iron',
      },
      {
        id: 116,
        name: 'Friary Mill Bakery',
      },
      {
        id: 117,
        name: 'Oggy Oggy Pasty',
      },
      {
        id: 118,
        name: 'Cakes & Bakes',
      },
      {
        id: 119,
        name: 'Deep Blue',
      },
      {
        id: 120,
        name: 'Spice Hut',
      },
      {
        id: 121,
        name: 'Chicken Land',
      },
      {
        id: 122,
        name: 'Ji',
      },
      {
        id: 123,
        name: 'Burger and Sauce',
      },
      {
        id: 124,
        name: 'Icestone Desserts',
      },
      {
        id: 125,
        name: 'Elite Pubs',
      },
      {
        id: 126,
        name: "Toro's Steakhouse",
      },
      {
        id: 127,
        name: 'Wahaca',
      },
      {
        id: 128,
        name: 'Chunky Chicken',
      },
      {
        id: 129,
        name: 'Baskin Robbins',
      },
      {
        id: 130,
        name: 'Marugame Udon',
      },
      {
        id: 131,
        name: 'Chocoberry',
      },
      {
        id: 132,
        name: 'Giraffe',
      },
      {
        id: 133,
        name: 'Béres',
      },
      {
        id: 134,
        name: 'Philpotts',
      },
      {
        id: 135,
        name: 'Hadfields',
      },
      {
        id: 136,
        name: 'Poke House',
      },
      {
        id: 137,
        name: 'Rockfish',
      },
      {
        id: 138,
        name: 'Busaba Eathai',
      },
      {
        id: 139,
        name: 'Hubbox',
      },
      {
        id: 140,
        name: 'Dhesi Sweet Centre',
      },
      {
        id: 141,
        name: 'Yard Sale Pizza',
      },
      {
        id: 142,
        name: 'Enish Nigerian Restaurant',
      },
      {
        id: 143,
        name: 'Dallas Chicken',
      },
      {
        id: 144,
        name: 'Frontier Pubs',
      },
      {
        id: 145,
        name: 'Urban Chocolatier',
      },
      {
        id: 146,
        name: 'MakHalal',
      },
      {
        id: 147,
        name: "Frankster's",
      },
      {
        id: 148,
        name: 'Sambuca',
      },
      {
        id: 149,
        name: 'Bone Daddies',
      },
      {
        id: 150,
        name: 'Wraps & Wings',
      },
      {
        id: 151,
        name: 'Patty & Bun',
      },
      {
        id: 152,
        name: 'Taste of Lahore',
      },
      {
        id: 153,
        name: 'Sbarro',
      },
      {
        id: 154,
        name: 'Buns from Home',
      },
      {
        id: 155,
        name: 'Jollibee',
      },
      {
        id: 156,
        name: 'Burger & Lobster',
      },
      {
        id: 157,
        name: 'Smacks Hamburgers',
      },
      {
        id: 158,
        name: 'Poké Shack',
      },
      {
        id: 159,
        name: 'Garbanzos',
      },
      {
        id: 160,
        name: 'Go Falafel',
      },
      {
        id: 161,
        name: 'Holy Cow',
      },
      {
        id: 162,
        name: "Raja's",
      },
      {
        id: 163,
        name: 'Sprinkles Gelato',
      },
      {
        id: 164,
        name: 'The Cornish Oven',
      },
      {
        id: 165,
        name: 'Perfect Chicken',
      },
      {
        id: 166,
        name: 'Afrikana',
      },
      {
        id: 167,
        name: 'Slap & Pickle',
      },
      {
        id: 168,
        name: 'Grounds',
      },
      {
        id: 169,
        name: 'Shoryu',
      },
      {
        id: 170,
        name: 'Chaaye Paani',
      },
      {
        id: 171,
        name: 'Sushimania',
      },
      {
        id: 172,
        name: 'The Stable',
      },
      {
        id: 173,
        name: 'Zambrero',
      },
      {
        id: 174,
        name: 'Slamburger',
      },
      {
        id: 175,
        name: 'Harlees',
      },
      {
        id: 176,
        name: 'Sundaes Gelato',
      },
      {
        id: 177,
        name: 'Piri Fino',
      },
      {
        id: 178,
        name: 'Janes Pantry',
      },
      {
        id: 179,
        name: 'Superfish',
      },
      {
        id: 180,
        name: 'Chilli Flames',
      },
      {
        id: 181,
        name: 'Chennai Dosa',
      },
      {
        id: 182,
        name: "Chickano's",
      },
      {
        id: 183,
        name: 'Atariya Foods',
      },
      {
        id: 184,
        name: 'Cornish Bakehouse',
      },
      {
        id: 185,
        name: 'Coffee Republic',
      },
      {
        id: 186,
        name: 'Afters Original',
      },
      {
        id: 187,
        name: "Ed's Easy Diner",
      },
      {
        id: 188,
        name: 'Chozen Noodle',
      },
      {
        id: 189,
        name: 'Rustico',
      },
      {
        id: 190,
        name: 'Dishoom',
      },
      {
        id: 191,
        name: 'Snowflake',
      },
      {
        id: 192,
        name: 'The Cake Solution',
      },
      {
        id: 193,
        name: 'Chicken Hub',
      },
      {
        id: 194,
        name: 'Middletons',
      },
      {
        id: 195,
        name: 'Chow Asian Kitchen',
      },
      {
        id: 196,
        name: 'DZRT',
      },
      {
        id: 197,
        name: 'Flour & Bean',
      },
      {
        id: 198,
        name: 'Chickaros',
      },
      {
        id: 199,
        name: 'Tom Bell',
      },
      {
        id: 200,
        name: 'Taka Taka',
      },
    ];
    for (const iterator of brandsList) {
      const packet = {
        name: iterator.name,
      };
      await this.createBrand(packet);
    }
  }
}
