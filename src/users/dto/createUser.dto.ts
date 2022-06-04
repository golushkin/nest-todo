import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  pass: string;

  @IsOptional()
  @IsString()
  email?: string;
}