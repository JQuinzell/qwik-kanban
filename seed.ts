import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const { count: cardCount } = await prisma.card.deleteMany()
  const { count: listCount } = await prisma.list.deleteMany()
  const { count: boardCount } = await prisma.board.deleteMany()

  console.log('creating boards')
  for (const board of ['Board 1', 'Board 2', 'Board 3']) {
    console.log('creating', board)
    const boardRecord = await prisma.board.create({ data: { name: board } })
    for (const list of ['List 1', 'List 2', 'List 3']) {
      const listRecord = await prisma.list.create({
        data: { name: list, boardId: boardRecord.id },
      })
      for (const [i, card] of ['Card 1', 'Card 2', 'Card 3'].entries()) {
        await prisma.card.create({
          data: { name: card, listId: listRecord.id, index: i },
        })
      }
    }
  }
}
main()
  .catch(async (e) => {
    console.log('error')
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('done')
    process.exit(0)
  })
