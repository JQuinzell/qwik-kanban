import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { List } from "~/components/List";
import { db } from "~/db";

export const useBoard = routeLoader$(async (req) => {
  const id = req.params.id;
  const board = await db.board.findUniqueOrThrow({
    where: { id },
    include: { lists: { include: { cards: true } } },
  });
  return board;
});

export default component$(() => {
  const board = useBoard();
  return (
    <>
      <h1>Board {board.value.name}</h1>
      <div class="flex gap-4 overflow-scroll">
        {board.value.lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
        {/* <CreateList onCreate={handleCreateList} /> */}
      </div>
    </>
  );
});
