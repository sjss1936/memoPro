import { Link } from "react-router-dom";
import { fmtDate } from "../lib/format";
import styles from "./NoteCard.module.css";

export default function NoteCard({ note }) {
  return (
    <div className={`${styles.noteCard} card`}>
      <h3 style={{marginTop:0, marginBottom:8}}>
        <Link to={`/notes/${note.id}`}>{note.title || "(제목 없음)"}</Link>
      </h3>
      <p style={{whiteSpace:"pre-line", marginTop:0, marginBottom:12}}>
        {note.content?.slice(0,120) || "(내용 없음)"}{note.content?.length>120?"…":""}
      </p>
      <div className="meta">작성: {fmtDate(note.createdAt)} • 수정: {fmtDate(note.updatedAt)}</div>
    </div>
  );
}