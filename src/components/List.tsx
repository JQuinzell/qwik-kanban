import { component$ } from "@builder.io/qwik";
import type { List as ListModel } from "~/db";
import { Card } from "./Card";

export const List = component$(({ list }: { list: ListModel }) => {
  return (
    <>
      <div class="w-[250px] bg-slate-300 p-5">
        <h3 class="mb-4 font-bold">{list.name}</h3>
        <ul>
          {list.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </ul>
      </div>
    </>
  );
});
