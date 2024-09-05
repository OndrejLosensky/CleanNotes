import { useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";

type NotesProps = {
    availableTags: Tag[]
}

export function NotesHomepage({ availableTags } : NotesProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")

  return (
    <main className="p-8">
      <div className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold"> CleanNotes </h1>
        <div className="flex flex-row gap-x-2 items-center">
          <Link to="/new">
            <button className="py-2 px-4 bg-violet-500 text-white rounded-md shadow-md">
              Add note
            </button>
          </Link>
          <button className="py-2 px-4 rounded-md border border-gray-600 text-gray-600">
            Edit tags
          </button>
        </div>
      </div>

      <form className="flex flex-row items-center justify-between gap-x-4">
        <div className="flex flex-col flex-1">
          <label className="text-xl font-medium pb-1"> Title </label>
          <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="py-2 px-4 border border-black/20 rounded-md" placeholder="search by title..." />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-xl font-medium pb-1">
            Tags
          </label>
          <ReactSelect
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}            
            isMulti
          />
        </div>
      </form>
    </main>
  );
}
