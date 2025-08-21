import NoteCard from "../components/NoteCard";
import { useMemo, useState } from "react";
import { useNotes } from "../contexts/NotesContext";

export default function NotesList() {
  const { notes } = useNotes();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("updated"); // created | updated | title

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = !q
      ? notes
      : notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q)
        );
    if (sort === "created") arr = [...arr].sort((a,b)=>b.createdAt-a.createdAt);
    if (sort === "updated") arr = [...arr].sort((a,b)=>b.updatedAt-a.updatedAt);
    if (sort === "title")   arr = [...arr].sort((a,b)=>a.title.localeCompare(b.title));
    return arr;
  }, [notes, query, sort]);

  return (
    <><div className="row" style={{marginBottom:12}}>
        <input placeholder="검색: 제목/내용"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <select value={sort} onChange={(e)=>setSort(e.target.value)}>
          <option value="updated">최근 수정순</option>
          <option value="created">최근 작성순</option>
          <option value="title">제목 순</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card">메모가 없습니다. 상단의 <b>새 메모</b>로 작성해 보세요.</div>
      ) : (
        <div className="list">
          {filtered.map((n) => <NoteCard key={n.id} note={n} />)}
        </div>
      )}
    </>
  );
}