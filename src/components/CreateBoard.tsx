import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";

interface Props {
  onCreate$: PropFunction<(name: string) => void>;
}
export const CreateBoard = component$((props: Props) => {
  const creating = useSignal(false);
  const name = useSignal("");

  const clear = $(() => {
    creating.value = false;
    name.value = "";
  });

  return (
    <>
      <div
        onClick$={() => (creating.value = true)}
        class="flex h-24 justify-center rounded-sm bg-gray-300 "
      >
        <div class="my-auto text-center text-sm text-black">
          Create New Board
        </div>
      </div>
      {creating.value && (
        <div>
          <div class="flex">
            <p>Create a board</p>
            <button
              class="btn btn-circle btn-outline btn-ghost ml-auto"
              onClick$={clear}
            >
              X
            </button>
          </div>
          <hr />
          <input
            type="text"
            class="input input-bordered"
            placeholder="Name"
            value={name.value}
            onChange$={(ev, el) => (name.value = el.value)}
          />
          <button
            class="btn"
            onClick$={() => {
              props.onCreate$(name.value);
              clear();
            }}
          >
            Create
          </button>
        </div>
      )}
    </>
  );
});
