import React from "react";
import { NoteForm } from "../action/NoteForm";
import { NoteData, Tag } from "../App";
import { useNote } from "../hooks/useNote";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote();

  return (
    <React.Fragment>
      <h1 className="text-4xl mb-4"> Edit Note </h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </React.Fragment>
  );
}
