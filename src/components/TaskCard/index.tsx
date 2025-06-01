"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Pencil } from "lucide-react";
import { Task } from "@/types/types";

const CardActions = ({ category }: { category: string }) => (
  <div className="flex flex-row justify-between">
    <div className="badge badge-secondary">{category}</div>
    <div className="flex flex-row gap-2">
      <Pencil
        className="hover:cursor-pointer"
        onClick={() => console.log("Edit task")}
      />
    </div>
  </div>
);

const CheckBox = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}) => (
  <>
    <input
      type="checkbox"
      checked={checked}
      className="checkbox checkbox-success rounded-full absolute top-2 right-2"
      onChange={() => setChecked((prev) => !prev)}
      name="complete"
      style={{ top: "0.5rem", right: "0.5rem", position: "absolute" }}
    />
    <label htmlFor="complete" />
  </>
);

interface Props {
  data: Task;
}

const TaskCard = ({ data }: Props) => {
  const [checked, setChecked] = useState(true);
  return (
    <div
      style={{ position: "relative" }}
      className="card relative xl:card-side bg-amber-50 rounded-2xl shadow-md h-1/3 lg:w-6xl md:w-3xl sm:w-lg"
    >
      <figure className="xl:w-1/3 lg:w-full md:w-full">
        <img src={data.image} alt="Todo image" />
      </figure>

      <div className="card-body p-3 sm:pt-0">
        <CheckBox checked={checked} setChecked={setChecked} />
        <div className="lg:mt-8 p-1">
          <h2 className="line-clamp-2">{data.title}</h2>
        </div>
        <CardActions category={data.category} />
      </div>
    </div>
  );
};

// "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
export default TaskCard;
