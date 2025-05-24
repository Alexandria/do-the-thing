import ImageDropzone from "@/components/Dropzone";
import Dropzone from "react-dropzone";

export default function NewTodo() {
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
            />
          </label>
          <label className="select bg-amber-50 shadow-md">
            <span className="label">Category</span>
            <select className="bg-amber-50">
              <option>Personal</option>
              <option>Business</option>
            </select>
          </label>
          <label>
            <textarea
              placeholder="Description"
              className="textarea bg-amber-50 shadow border-gray-300"
            ></textarea>
          </label>
          <ImageDropzone />
          <button className="btn btn-primary btn-block">Create</button>
        </div>
      </div>
    </main>
  );
}
