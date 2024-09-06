import { Link } from "react-router-dom";
import { useNote } from "../layout/NoteLayout";
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw';

type NoteProps = {
    onDelete: (id: string) => void
  }

export function Note ({ onDelete } : NoteProps) {
  const note = useNote()
  
  return (
    <div>
        <div className="flex flex-row justify-between mb-6">
            <div className="flex flex-col">
                <h2 className="text-3xl font-medium pb-2">{note.title}</h2>
                {note.tags.length > 0 && (
                    <span className="flex flex-row items-center gap-x-2">
                        {note.tags.map(tag => (
                            <p key={tag.id} className="py-1 px-4 rounded-full bg-violet-400"> {tag.label} </p>
                        ))}
                    </span>
                )}                
            </div>
            <div className="flex flex-row gap-x-2 items-center">
                <Link to={`/${note.id}/edit`}>
                    <button className="py-2 px-4 bg-violet-500 text-white rounded-md shadow-md">
                        Edit
                    </button>
                </Link>
                <button onClick={() => {
                    onDelete(note.id)                            
                    }} 
              className="py-2 px-4 rounded-md border border-red-600 text-red-600 hover:text-white hover:bg-red-600 duration-300">
                    Delete
                </button>
                <Link to="/">
                    <button className="py-2 px-4 rounded-md border border-gray-500 text-gray-500"> 
                        Back
                    </button>
                </Link>
            </div>
        </div>

        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {Array.isArray(note.markdown) ? note.markdown.join('') : note.markdown}
        </ReactMarkdown>
    </div>
  )
}