import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  list(){
    return this.prisma.card.findMany({ include: { asignaciones: true, responsable: true } })
  }

  create(dto: any){
    return this.prisma.card.create({ data: dto })
  }

  update(id: string, dto: any){
    return this.prisma.card.update({ where: { id }, data: dto })
  }

  move(id: string, status: any){
    return this.prisma.card.update({ where: { id }, data: { status } })
  }
}
