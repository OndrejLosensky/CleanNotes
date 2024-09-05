import React from "react";
import { NoteForm } from "../action/NoteForm";

export function NewNote() {
    return (
        <React.Fragment>
            <h1 className="text-4xl mb-4"> New Note </h1>
            <NoteForm/>
        </React.Fragment>
    )
}