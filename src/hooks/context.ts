import type { Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";
import type { Card } from "@prisma/client";

export const DragContext = createContextId<Signal<Card | null>>("drag");
