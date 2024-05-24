import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'src/models/dto';
import { SmartSearchService } from 'src/services';

@ApiTags('Smart-Search')
@Controller('smart-search')
export class SmartSearchController {
  constructor(private readonly smartSearchService: SmartSearchService) {}

  @Post('optimal')
  @ApiOperation({ summary: 'Search ' })
  @ApiBody({ type: SearchDto })
  async searchOptimal(@Body() payload: SearchDto) {
    return await this.smartSearchService.extractEntities(payload);
  }

  @Post('non-optimal')
  @ApiOperation({ summary: 'Search ' })
  @ApiBody({ type: SearchDto })
  async ad(@Body() payload: SearchDto) {
    return await this.smartSearchService.searchEntities(payload.search);
  }
}
