import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header({ onNew, toggleTheme, currentTheme }) {
  const [q, setQ] = useState("");
  // 상위에서 필터링 하고 싶다면 props로 넘겨도 됨. 여기서는 안내만.
  return (
    <div className="header">
      <h1 style={{margin:0}}>🗒️ 메모장</h1> {/* Left section */}

      <div className="header-buttons-right"> {/* New div for right-aligned buttons */}
        <button className="btn ghost" onClick={onNew}>새 메모</button>
        <Link to="/notes" className="btn ghost" style={{display:"inline-block", textDecoration:"none"}}>목록</Link>
        {/* Dark mode toggle button */}
        <button className="btn ghost" onClick={toggleTheme}> 
          {currentTheme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}