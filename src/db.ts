import {Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client'
export const db = new PrismaClient()

const listWithCards = Prisma.validator<Prisma.ListDefaultArgs>()({
  include: { cards: true },
})

export type List = Prisma.ListGetPayload<typeof listWithCards>

const card = Prisma.validator<Prisma.CardDefaultArgs>()({})

export type Card = Prisma.CardGetPayload<typeof card>