import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  routeAction$,
} from "@builder.io/qwik-city";
import { BoardCard } from "~/components/BoardCard";
import { CreateBoard } from "~/components/CreateBoard";
import { db } from "~/db";

export const useBoards = routeLoader$(async () => {
  const boards = await db.board.findMany();
  return boards;
});

export const useCreateBoard = routeAction$(async (data) => {
  await db.board.create({ data: { name: data.name as string } });
});

export default component$(() => {
  const boardsSignal = useBoards();
  const createBoardAction = useCreateBoard();

  return (
    <main class="grid grid-cols-[300px_1fr]">
      <nav></nav>
      <div>
        <h2 class="mb-4 text-left text-xl font-bold">Boards</h2>
        <div class="grid grid-cols-4 gap-x-4 gap-y-8">
          {boardsSignal.value.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}

          <CreateBoard
            onCreate$={(name) => {
              createBoardAction.submit({ name });
            }}
          />
        </div>
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
