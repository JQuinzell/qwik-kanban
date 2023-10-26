import { component$, useSignal } from "@builder.io/qwik";
import { type List as ListModel } from "~/db";
import { Card } from "./Card";
import { useCreateCard } from "~/routes/boards/[id]";

type Props = {
  list: ListModel;
};
export const List = component$(({ list }: Props) => {
  const newCard = useSignal<string>();
  const createCardAction = useCreateCard();
  return (
    <>
      <div class="w-[250px] bg-slate-300 p-5">
        <h3 class="mb-4 font-bold">{list.name}</h3>
        <ul>
          {list.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </ul>
        {typeof newCard.value === "string" ? (
          <div class="my-4">
            <input
              type="text"
              class="input input-bordered"
              value={newCard.value}
              onChange$={(ev) => (newCard.value = ev.target.value)}
            />
            <button
              class="btn"
              onClick$={() => {
                createCardAction.submit({
                  name: newCard.value,
                  listId: list.id,
                });
                newCard.value = undefined;
              }}
            >
              Create card
            </button>
          </div>
        ) : (
          <button class="btn my-4" onClick$={() => (newCard.value = "")}>
            Add a card
          </button>
        )}
      </div>
    </>
  );
});
