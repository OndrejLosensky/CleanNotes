import React, { useMemo } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { NewNote } from "./components/NewNote"
import { useLocalStorage } from "./hooks/useLocalStorage"

import { v4 as uuidV4 } from 'uuid';
import { NotesHomepage } from "./components/Notes";
import { NoteLayout } from "./layout/NoteLayout";
import { Note } from "./components/Note";
import { EditNote } from "./components/EditNote";

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  return (
    <React.Fragment>
      <section className="p-8">
        <Routes>
            <Route path="/" element={<NotesHomepage notes={notesWithTags} availableTags={tags}/>}/>
            <Route path="/new" element={<h1> <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} /> </h1>}/>
            <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
              <Route index element={<Note onDelete={onDeleteNote} />} />
              <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </section>
    </React.Fragment>
  )
}

export default App
