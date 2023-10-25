import { component$ } from "@builder.io/qwik";
import type { Card as CardModel } from "~/db";

export const Card = component$(({ card }: { card: CardModel }) => {
  return (
    <>
      <li class="mb-2 rounded-md bg-gray-50 p-2">{card.name}</li>
    </>
  );
});
