import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CardsService } from './cards.service'

@Controller('api/cards')
export class CardsController {
  constructor(private readonly svc: CardsService) {}

  @Get()
  list(){ return this.svc.list() }

  @Post()
  create(@Body() dto: any){ return this.svc.create(dto) }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any){ return this.svc.update(id, dto) }

  @Post(':id/move')
  move(@Param('id') id: string, @Body() dto: any){ return this.svc.move(id, dto.status) }
}
