import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'src/models/dto';
import { SmartSearchService } from 'src/services';

@ApiTags('Smart-Search')
@Controller('smart-search')
export class SmartSearchController {
  constructor(private readonly smartSearchService: SmartSearchService) {}

  @Post('add')
  @ApiOperation({ summary: 'Search ' })
  @ApiBody({ type: SearchDto })
  async addDishTypes(@Body() payload: SearchDto) {
    console.log(payload);
    return await this.smartSearchService.extractEntities(payload);
  }
}
