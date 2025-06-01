"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { supabase } from "@/supabaseClient";

const Avatar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const signOut = async () => {
    await supabase.auth.signOut();
    setShowDrawer(false);
    redirect("/login");
  };

  const Drawer = () => {
    return (
      <ul className="list bg-amber-200 rounded-box shadow-md p-5 gap-2 absolute right-5">
        <li>Account Information</li>
        <li>
          <button onClick={signOut} className="btn btn-neutral">
            Sign Out
          </button>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <div
        tabIndex={0}
        className="relative avatar hover:cursor-pointer"
        onClick={() => setShowDrawer((prev) => !prev)}
        role="button"
      >
        <div className="w-10 rounded-full">
          <img
            alt="avatar"
            src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
          />
        </div>
      </div>
      {showDrawer && <Drawer />}
    </div>
  );
};

export default Avatar;
