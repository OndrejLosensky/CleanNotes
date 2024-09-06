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
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

type EditTagsModalProps = {
  show: boolean
  availableTags: Tag[]
  handleClose: () => void
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export function NotesHomepage({ availableTags, notes, onDeleteTag, onUpdateTag } : NotesProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

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
          <button onClick={() => setEditTagsModalIsOpen(true)} className="py-2 px-4 rounded-md border border-gray-600 text-gray-600">
            Edit tags
          </button>
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

      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
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

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  if (!show) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit Tags</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {availableTags.map((tag) => (
            <div key={tag.id} className="flex justify-between items-center">
              <input
                type="text"
                value={tag.label}
                onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                className="flex-grow py-2 px-4 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => onDeleteTag(tag.id)}
                className="ml-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
