import { component$ } from "@builder.io/qwik";
import { useAuthSession, useAuthSignout } from "../plugin@auth";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async (event) => {
  const session = event.sharedMap.get("session");
  if (!session) {
    throw event.redirect(
      302,
      `/api/auth/signin?callbackUrl=${event.url.pathname}`,
    );
  }
};
export default component$(() => {
  const session = useAuthSession();
  const signout = useAuthSignout();
  const user = session.value?.user ?? { name: "Stranger" };
  return (
    <>
      <p>Welcome to a secret page {user.name}</p>

      <button class="btn" onClick$={() => signout.submit({})}>
        Sign Out
      </button>
    </>
  );
});
