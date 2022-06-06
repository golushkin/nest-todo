import { PipeTransform, ValidationPipe } from '@nestjs/common';

export const getGlobalPipes = (): PipeTransform<any>[] => {
  return [
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true
    })
  ]
}