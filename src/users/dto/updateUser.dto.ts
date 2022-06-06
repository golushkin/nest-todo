import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  pass: string;

  @IsOptional()
  @IsString()
  email?: string;
}