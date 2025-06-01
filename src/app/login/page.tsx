"use client";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../supabaseClient";
import { Session } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const Login = () => {
  const [session, setSession] = useState<Session | null>(null);

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

    // const login = async () => {
    //   await supabase.auth.signInWithOAuth({
    //     provider: "google",
    //     options: {
    //       redirectTo: `http://localhost:3000/`,
    //     },
    //   });
    // };
    // login();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session onAuthStateChange", session);
      console.log("session onAuthStateChange", _event);

      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return redirect("/");
  }
};

export default Login;
