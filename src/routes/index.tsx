import { component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { BoardCard } from '~/components/BoardCard'
import { db } from '~/db'

export const useBoards = routeLoader$(async () => {
  const boards = await db.board.findMany()
  return boards
})

export default component$(() => {
  const boardsSignal = useBoards()
  console.log(boardsSignal.value)
  // const boards = useRouteData<typeof routeData>()
  // const [_, handleCreateBoard] = createRouteAction(async (name: string) => {
  //   await client.createBoard.mutate(name)
  // })

  return (
    <main class='grid grid-cols-[300px_1fr]'>
      <nav></nav>
      <div>
        <h2 class='text-left text-xl font-bold mb-4'>Boards</h2>
        <div class='grid-cols-4 grid gap-x-4 gap-y-8'>
          {boardsSignal.value.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}

          {/* <For each={boards()}>{(board) => <BoardCard board={board} />}</For> */}
          {/* <CreateBoard onCreate={handleCreateBoard} /> */}
        </div>
      </div>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
