import React, { FormEvent, useRef, useState } from "react";
import CreateableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";

import { v4 as uuidV4 } from 'uuid';
import { useNavigate } from "react-router-dom";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
};

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: bodyRef.current!.value,
      tags: selectedTags,
    });

    navigate("..")
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-row justify-between items-center gap-x-6 mb-6">
          <div className="flex flex-col flex-1">
            <label htmlFor="" className="text-xl font-medium pb-1">
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              placeholder="Think of an title..."
              className="py-2 px-4 rounded-md border border-black/20"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="" className="text-xl font-medium pb-1">
              Tags
            </label>
            <CreateableReactSelect
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map(tag => {
                return { label: tag.label, value: tag.id}
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              onCreateOption={label => {
                const newTag = { id: uuidV4(), label}
                onAddTag(newTag)
                setSelectedTags(prev => [...prev, newTag])
              }}
              isMulti
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-xl font-medium pb-1">
            Body
          </label>
          <textarea
            ref={bodyRef}
            rows={15}
            placeholder="Start typing..."
            className="py-2 px-4 rounded-md border border-black/20"
          />
        </div>
        <div className="flex flex-row justify-end gap-x-4 mt-4">
          <button className="flex flex-row items-center gap-x-2 py-2 px-4 bg-violet-500 text-gray-100 rounded-md">
            <span> Save </span>
          </button>
          <button className="flex text-red-500 flex-row items-center gap-x-2 py-2 px-4 border border-red-500 rounded-md">
            <span> Cancel </span>
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
