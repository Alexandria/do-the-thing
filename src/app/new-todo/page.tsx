"use client";
import ImageDropzone from "@/components/Dropzone";
import { supabase } from "../../../utils/supabaseClient";
import { Action, ActionTypes } from "@/types/types";
import { redirect } from "next/navigation";
import { useReducer } from "react";

interface State {
  title: string;
  category: string;
  description?: string;
  image?: string;
  error?: string;
}

const initialState: State = {
  title: "",
  category: "Personal",
  description: "",
  image: "",
  error: "",
};

type Task = Omit<State, "error">;

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
    case ActionTypes.SetError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const ErrorAlert = ({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) => {
  return (
    <div role="alert" className="alert alert-error w-1/5">
      <div role="button" onClick={onDismiss}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <span>{message}</span>
    </div>
  );
};

const SerializeData = (state: State): Task => {
  const data = { ...state };
  delete data.error;
  return data;
};

export default function NewTodo() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const onDismissError = () => {
    dispatch({ type: ActionTypes.SetError, payload: "" });
  };
  const handleCreate = async () => {
    const newTask = SerializeData(state);
    const { error } = await supabase.from("Tasks").insert(newTask);
    if (error) {
      console.log("Error adding tasks", error.message);
      dispatch({
        type: ActionTypes.SetError,
        payload: `Error adding tasks, ${error.message}`,
      });
      return;
    }
    redirect("/");
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-2">
      {state.error && (
        <ErrorAlert message={state.error} onDismiss={onDismissError} />
      )}
      <div className="card w-1/5 bg-amber-50 card-sm shadow-sm">
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
