import {  IsString, IsOptional, IsInt } from "class-validator";

export class CreateNewsDto {
  @IsInt()
  @IsOptional()
  readonly userId?: number;

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

  @IsString()
  @IsOptional()
  readonly imagem?: string;

  @IsString()
  @IsOptional()
  readonly imagem_thumb?: string;

  @IsString()
  @IsOptional()
  readonly conteudo?: string;
}