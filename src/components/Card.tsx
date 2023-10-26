import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { Card as CardModel } from "~/db";
import { DragContext } from "~/hooks/context";

export const Card = component$(({ card }: { card: CardModel }) => {
  const ref = useSignal<HTMLElement>();
  const draggedCard = useContext(DragContext);

  useVisibleTask$(({ cleanup }) => {
    const el = ref.value;
    if (!el) return;

    function handleDragStart() {
      console.log("Dragging card", card.id);
      draggedCard.value = { ...card };
    }

    function handleDragEnd() {
      draggedCard.value = null;
    }

    function handleDrop() {
      console.log("Dropping", draggedCard.value?.name, "onto", card.name);
      draggedCard.value = null;
    }

    function handleDragEnter(e: Event) {
      e.preventDefault();
    }

    function handleDragOver(e: Event) {
      e.preventDefault();
    }

    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("dragend", handleDragEnd);
    el.addEventListener("drop", handleDrop);
    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragover", handleDragOver);

    cleanup(() => {
      el.removeEventListener("dragstart", handleDragStart);
      el.removeEventListener("dragend", handleDragEnd);
      el.removeEventListener("drop", handleDrop);
      el.removeEventListener("dragenter", handleDragEnter);
      el.removeEventListener("dragover", handleDragOver);
    });
  });
  return (
    <>
      <li ref={ref} draggable class="mb-2 rounded-md bg-gray-50 p-2">
        {card.name}
      </li>
    </>
  );
});
