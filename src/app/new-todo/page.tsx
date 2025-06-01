"use client";
import ImageDropzone from "@/components/Dropzone";
import { supabase } from "@/supabaseClient";
import { Action, ActionTypes } from "@/types/types";
import { useReducer } from "react";

interface State {
  title: string;
  category: string;
  description?: string;
  image?: string;
}

const initialState: State = {
  title: "",
  category: "Personal",
  description: "",
  image: "",
};

const taskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.UpdateTitle:
      return {
        ...state,
        title: action.payload,
      };
    case ActionTypes.UpdateCategory:
      return {
        ...state,
        category: action.payload,
      };
    case ActionTypes.UpdateDescription:
      return {
        ...state,
        description: action.payload,
      };
    case ActionTypes.UpdateImage:
      return {
        ...state,
        image: action.payload,
      };
    default:
      return state;
  }
};

export default function NewTodo() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const handleCreate = async () => {
    console.log("**************");
    console.log("Creating Task");
    console.log("New task => ", state);
    console.log("**************");
    const { error } = await supabase.from("Tasks").insert(state);

    if (error) {
      console.log("Error adding tasks", error.message);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-amber-50 card-sm shadow-sm">
        <div className="card-body flex gap-3  p-8">
          <h2 className="card-title">New Thing</h2>
          <label htmlFor="title" className="floating-label bg-amber-50">
            <input
              type="text"
              placeholder="New todo..."
              className="input input-md shadow-md bg-amber-50"
              name="title"
              value={state.title}
              onChange={(event) =>
                dispatch({
                  payload: event.target.value,
                  type: ActionTypes.UpdateTitle,
                })
              }
            />
          </label>
          <label className="select bg-amber-50 shadow-md">
            <span className="label">Category</span>
            <select
              className="bg-amber-50"
              value={state.category}
              onChange={(event) =>
                dispatch({
                  payload: event.target.value,
                  type: ActionTypes.UpdateCategory,
                })
              }
            >
              <option>Personal</option>
              <option>Business</option>
            </select>
          </label>
          <label htmlFor="Description">
            <textarea
              placeholder="Description"
              className="textarea bg-amber-50 shadow border-gray-300"
              name="Description"
              value={state.description}
              onChange={(event) =>
                dispatch({
                  payload: event.target.value,
                  type: ActionTypes.UpdateDescription,
                })
              }
            />
          </label>
          <ImageDropzone dispatch={dispatch} />
          <button
            disabled={state.title === ""}
            className="btn btn-primary btn-block"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </main>
  );
}
