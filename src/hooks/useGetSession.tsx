"use client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { createClient } from "../../utils/supabase/component";

export const useGetSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    console.log("login screen");
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        console.log("Data session", session);
        setSession(session);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return { session, supabase };
};
