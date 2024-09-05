import { Link } from "react-router-dom";

export function NotesHomepage () {
    return (
        <main className="p-8">
            <div className="flex flex-row justify-between items-center">
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
        </main>
    )
}