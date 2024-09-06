import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";

type NotePreviewCard = {
    tags: Tag[]
    title: string
    id: string
}

type NotesProps = {
    availableTags: Tag[]
    notes: NotePreviewCard[]
}

export function NotesHomepage({ availableTags, notes } : NotesProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

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
          {/*
          <button className="py-2 px-4 rounded-md border border-gray-600 text-gray-600">
            Edit tags
          </button>
           */}
        </div>
      </div>

      <form className="flex flex-row items-center justify-between gap-x-4 mb-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNotes.map(note => (
            <div key={note.id}>
                <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </div>
        ))}
      </div>
    </main>
  );
}

function NoteCard ({ id, title, tags } : NotePreviewCard ) {
    return (
        <Link to={`/${id}`} className="w-full flex flex-col items-center justify-center bg-neutral-100 border border-black/15 shadow-sm rounded-lg py-8 duration-200 hover:border-black/30 hover:scale-[1.03] hover:shadow-lg ">
            <h1 className="text-2xl font-semibold pb-3" key={id}>{title}</h1>
            {tags.length > 0 && (
                <div className="space-x-2">
                    {tags.map(tag => (
                        <span className="bg-blue-400 rounded-full py-1 px-4" key={tag.id}> {tag.label} </span>
                    ))}
                </div>
            )}
        </Link>
    )
}