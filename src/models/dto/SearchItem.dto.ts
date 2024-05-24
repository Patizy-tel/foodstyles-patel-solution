import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({ description: 'price' })
  @IsNotEmpty()
  @IsString()
  readonly search: string;
}
