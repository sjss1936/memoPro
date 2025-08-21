import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import NotesList from "./pages/NotesList";
import NoteDetail from "./pages/NoteDetail";
import NoteForm from "./pages/NoteForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/notes" replace />} />
        <Route path="notes" element={<NotesList />} />
        <Route path="notes/:id" element={<NoteDetail />} />
        <Route path="new" element={<NoteForm mode="create" />} />
        <Route path="edit/:id" element={<NoteForm mode="edit" />} />
      </Route>
      <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
    </Routes>
  );
}
