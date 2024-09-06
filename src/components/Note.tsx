import { Link } from "react-router-dom";
import { useNote } from "../hooks/useNote";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"; 

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();

  return (
    <div>
      <div className="flex flex-row justify-between w-full items-center mb-6 px-4">
        <div className="flex flex-col w-1/2">
          <h2 className="text-3xl font-medium pb-2">{note.title}</h2>
          {note.tags.length > 0 && (
            <span className="flex flex-row items-center gap-x-2 mb-4 md:mb-0">
              {note.tags.map((tag) => (
                <p key={tag.id} className="py-1 px-4 rounded-full bg-violet-400">
                  {tag.label}
                </p>
              ))}
            </span>
          )}
        </div>
        <div className="flex flex-row w-1/2 justify-end gap-x-2 items-center">
          <Link to={`/${note.id}/edit`}>
            <button className="bg-violet-500 flex-1 py-2 px-4  text-white rounded-md shadow-md">
              Edit
            </button>
          </Link>
          <button
            onClick={() => {
              onDelete(note.id);
            }}
            className="py-2 px-4 rounded-md border border-red-600 text-red-600 hover:text-white hover:bg-red-600 duration-300"
          >
            Delete
          </button>
          <Link to="/">
            <button className="py-2 px-4 rounded-md border border-gray-500 text-gray-500">
              Back
            </button>
          </Link>
        </div>
      </div>

      <div className="prose p-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
        >
          {note.markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
