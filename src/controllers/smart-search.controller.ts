import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SmartSearchService } from 'src/services';

@ApiTags('Smart-Search')
@Controller('smart-search')
export class SmartSearchController {
  constructor(private readonly smartSearchService: SmartSearchService) {}

  @Post('add')
  async addDishTypes(@Body('search') payload: { search: string }) {
    return await this.smartSearchService.searchEntities(payload);
  }
}
