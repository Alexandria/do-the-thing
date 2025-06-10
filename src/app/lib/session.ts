import "server-only";
import { cookies } from "next/headers";
import { Session } from "@supabase/supabase-js";

export async function createCookie(session: Session) {
  const cookieStore = await cookies();

  cookieStore.set("session", session.user.id, {
    httpOnly: true,
    secure: true,
    expires: session.expires_at,
    sameSite: "lax",
    path: "/",
    ...session,
  });
}
