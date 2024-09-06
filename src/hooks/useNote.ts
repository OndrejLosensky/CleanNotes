import { useOutletContext } from "react-router-dom";
import { Note } from "../App";

export function useNote() {
  return useOutletContext<Note>();
}
