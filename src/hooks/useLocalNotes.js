import { useEffect, useState } from "react";

const STORAGE_KEY = "notes";

export default function useLocalNotes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      {
        id: Date.now(),
        title: "환영합니다 👋",
        content: "이 메모는 예시입니다. 상단에서 새 메모를 작성해보세요!",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // C
  const createNote = ({ title, content }) => {
    const now = Date.now();
    const note = { id: now, title, content, createdAt: now, updatedAt: now };
    setNotes((prev) => [note, ...prev]);
    return note.id;
  };

  // R
  const getNote = (id) => notes.find((n) => n.id === Number(id));

  // U
  const updateNote = (id, patch) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === Number(id) ? { ...n, ...patch, updatedAt: Date.now() } : n
      )
    );
  };

  // D
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== Number(id)));
  };

  return { notes, createNote, getNote, updateNote, deleteNote };
}