import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../contexts/NotesContext";

export default function NoteForm({ mode }) {
  const { createNote, getNote, updateNote } = useNotes();
  const navigate = useNavigate();
  const { id } = useParams();

  const editing = mode === "edit";
  const existing = editing ? getNote(id) : null;

  const [title, setTitle] = useState(existing?.title || "");
  const [content, setContent] = useState(existing?.content || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing && !existing) {
      // 잘못된 URL로 접근 시 목록으로
      navigate("/notes", { replace: true });
    }
  }, [editing, existing, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      setError("제목 또는 내용을 입력해주세요.");
      return;
    }
    if (editing) {
      updateNote(id, { title: title.trim(), content: content.trim() });
      navigate(`/notes/${id}`);
    } else {
      const newId = createNote({ title: title.trim(), content: content.trim() });
      navigate(`/notes/${newId}`);
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2 style={{marginTop:0}}>{editing ? "메모 수정" : "새 메모 작성"}</h2>

      <label>제목</label>
      <input value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="메모 제목"
      />

      <label style={{marginTop:12}}>내용</label>
      <textarea rows={10}
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        placeholder="메모 내용을 입력하세요"
      />

      {error && <div className="meta" style={{color:"#b91c1c"}}>{error}</div>}

      <div className="row" style={{justifyContent:"flex-end", marginTop:12}}>
        <button type="button" className="btn ghost" onClick={() => navigate(-1)}>취소</button>
        <button className="btn primary" type="submit">{editing ? "저장" : "작성"}</button>
      </div>
    </form>
  );
}
