import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'src/models/dto';
import { SmartSearchService } from 'src/services';

@ApiTags('Smart-Search')
@Controller('smart-search')
export class SmartSearchController {
  constructor(private readonly smartSearchService: SmartSearchService) {}

  @Post('add')
  @ApiOperation({ summary: 'Search ' })
  async addDishTypes(@Body('search') payload: SearchDto) {
    return await this.smartSearchService.extractEntities(payload);
  }
}
