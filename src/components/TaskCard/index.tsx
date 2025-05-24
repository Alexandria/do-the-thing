"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";

const TaskCard = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className="card card-xs lg:card-side bg-amber-50 rounded-2xl shadow-md h-1/3 lg:w-6xl md:w-3xl sm:w-lg">
      <figure className="p-3 lg:w-55 md:w-32">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-lg"
        />
      </figure>
      <div className="card-body p-5 gap-5">
        <div className="flex flex-row justify-between">
          <div className="badge badge-secondary">Personal</div>
          <div className="flex flex-row gap-2">
            <Pencil
              className="hover:cursor-pointer"
              onClick={() => console.log("Edit task")}
            />
          </div>
        </div>
        <div className="card-title flex flex-row">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={checked}
              className="checkbox checkbox-success"
              onChange={() => setChecked((prev) => !prev)}
              name="complete"
            />
            <label htmlFor="complete" />
          </div>
          <h2 className="line-clamp-2">
            Get new shoes from Old Navy. Must be green and Nike
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
