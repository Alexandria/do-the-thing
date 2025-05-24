"use client";

import Avatar from "../Avatar";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="flex h-full content-center p-4 justify-between">
        <div className=" flex items-center">
          <h1>Do The Thing</h1>
        </div>
        <Avatar />
      </div>
    </nav>
  );
};

export default Navbar;
