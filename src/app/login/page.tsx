"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { redirect } from "next/navigation";
import { useGetSession } from "@/hooks/useGetSession";

const Login = () => {
  const { session, supabase } = useGetSession();

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return redirect("/");
  }
};

export default Login;
