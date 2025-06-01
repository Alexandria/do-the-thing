"use client";
import TaskCard from "@/components/TaskCard";
import { supabase } from "@/supabaseClient";
import { Tables } from "@/types/database.types";
import { Task } from "@/types/types";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const serializeTasks = (data: Tables<"Tasks">[]): Task[] => {
  return data.map(
    (data): Task => ({
      id: data.id.toString(),
      title: data.title,
      description: data.description ?? "",
      image: data.image ?? "",
      category: data.category,
    })
  );
};

export default function Home() {
  const [data, setData] = useState<Task[] | null>();

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("Tasks")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      console.log("There was an error fetching tasks", error.message);
    }
    if (!data) return;
    const tasks = serializeTasks(data);
    setData(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start lg:w-6xl md:w-3xl sm:w-lg">
        <div className="flex flex-row w-full justify-between content-center">
          <h1 className="flex items-center">Today&apos;s Tasks</h1>
          <Link href={"/new-todo"} passHref>
            <button className="btn btn-soft bg-indigo-500">
              <Plus /> Create
            </button>
          </Link>
        </div>
        <div className="flex justify-center bg-amber-300 w-full p-5 gap-5 rounded-xl">
          {data?.map((data) => (
            <TaskCard key={data.id} data={data} />
          ))}
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-center">
        <h1>Page footer</h1>
      </footer>
    </div>
  );
}
