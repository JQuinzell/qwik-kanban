import { component$ } from '@builder.io/qwik'
import type { Board } from '@prisma/client'

export const BoardCard = component$(({ board }: { board: Board }) => {
  // const navigate = useNavigate()

  // function handleClick() {
  //   navigate(`/boards/${board.id}`)
  // }

  return (
    <div
      class='p-0 h-24 bg-blue-600 rounded-sm hover:cursor-pointer'
      // onClick={handleClick}
    >
      <p class='font-bold m-3 text-md left-0 text-left text-white'>
        {board.name}
      </p>
    </div>
  )
})
