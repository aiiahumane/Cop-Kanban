import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { CardsController } from './cards/cards.controller'
import { CardsService } from './cards/cards.service'

@Module({
  controllers: [CardsController],
  providers: [PrismaService, CardsService]
})
export class AppModule {}
