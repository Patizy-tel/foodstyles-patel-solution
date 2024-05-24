import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SmartSearchService } from 'src/services';

@ApiTags('Smart-Search')
@Controller('smart-search')
export class SmartSearchController {
  constructor(private readonly smartSearchService: SmartSearchService) {}

  @Get('add')
  async addDishTypes(@Query() payload: any) {
    return await this.smartSearchService.searchEntities(payload);
  }
}
