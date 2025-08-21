import { useNavigate, useParams, Link } from "react-router-dom";
import { fmtDate } from "../lib/format";
import { useNotes } from "../contexts/NotesContext";

export default function NoteDetail() {
  const { getNote, deleteNote } = useNotes();
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  if (!note) {
    return <div className="card">해당 메모를 찾을 수 없습니다. <Link to="/notes">목록으로</Link></div>;
  }

  const onDelete = () => {
    if (confirm("정말 삭제할까요? 이 작업은 되돌릴 수 없습니다.")) {
      deleteNote(id);
      navigate("/notes");
    }
  };

  return (
    <div className="card">
      <div className="row" style={{justifyContent:"space-between", marginBottom:10}}>
        <h2 style={{margin:0}}>{note.title || "(제목 없음)"}</h2>
        <div className="row">
          <Link to={`/edit/${note.id}`} className="btn ghost" style={{textDecoration:"none"}}>수정</Link>
          <button className="btn" onClick={onDelete} style={{background:"#ef4444", color:"#fff"}}>삭제</button>
        </div>
      </div>
      <div className="meta" style={{marginBottom:12}}>
        작성: {fmtDate(note.createdAt)} • 수정: {fmtDate(note.updatedAt)}
      </div>
      <div style={{whiteSpace:"pre-line"}}>{note.content || "(내용 없음)"}</div>
      <div style={{marginTop:12}}>
        <Link to="/notes">← 목록으로</Link>
      </div>
    </div>
  );
}

