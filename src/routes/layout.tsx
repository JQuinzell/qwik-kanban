import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import type { Card } from "~/db";

import styles from "./styles.css?inline";
import { DragContext } from "~/hooks/context";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const draggedCard = useSignal<null | Card>(null);
  useContextProvider(DragContext, draggedCard);

  useStyles$(styles);
  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});
