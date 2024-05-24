import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SmartSearchService } from 'src/services';

@ApiTags('Smart-Search')
@Controller('smart-search')
export class SmartSearchController {
  constructor(private readonly smartSearchService: SmartSearchService) {}

  @Post('add')
  async addDishTypes(@Body('search') payload: any) {
    return await this.smartSearchService.extractEntities(payload, 3, 5);
  }
}
