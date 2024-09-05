import React from "react";
import { NoteForm } from "../action/NoteForm";
import { NoteData, Tag } from "../App";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}  

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
    return (
        <React.Fragment>
            <h1 className="text-4xl mb-4"> New Note </h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
        </React.Fragment>
    )
}
