import { Type } from "class-transformer";
import { IsString, IsOptional, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {

  @IsString()
  @IsOptional()
  readonly editoria?: string;

  @IsString()
  @IsOptional()
  readonly url?: string;

  @IsString()
  @IsOptional()
  readonly titulo?: string;

  @IsString()
  @IsOptional()
  readonly subtitulo?: string;

  @IsString()
  @IsOptional()
  readonly data_hora_publicacao?: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary',
    required: false,
    description: 'Imagem principal da notícia'
  })
  @IsOptional()
  readonly imagem?: any;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary',
    required: false,
    description: 'Thumbnail da imagem da notícia'
  })
  @IsOptional()
  readonly imagem_thumb?: any;

  @IsString()
  @IsOptional()
  readonly conteudo?: string;
}