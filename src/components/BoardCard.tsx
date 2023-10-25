import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { Board } from "@prisma/client";

export const BoardCard = component$(({ board }: { board: Board }) => {
  const navigate = useNavigate();

  return (
    <div
      class="h-24 rounded-sm bg-blue-600 p-0 hover:cursor-pointer"
      onClick$={() => navigate(`/boards/${board.id}`)}
    >
      <p class="text-md left-0 m-3 text-left font-bold text-white">
        {board.name}
      </p>
    </div>
  );
});
