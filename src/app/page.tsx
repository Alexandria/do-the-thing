import TaskCard from "@/components/TaskCard";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
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
        <div className="flex justify-center bg-amber-300 w-full p-5 gap-5">
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-center">
        <h1>Page footer</h1>
      </footer>
    </div>
  );
}
