import { createContext, useContext } from "react";
import useLocalNotes from "../hooks/useLocalNotes";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const notesApi = useLocalNotes();
  return (
    <NotesContext.Provider value={notesApi}>{children}</NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
