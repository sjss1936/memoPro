import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import useTheme from "../hooks/useTheme";

export default function MainLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container">
      <Header onNew={() => navigate("/new")} toggleTheme={toggleTheme} currentTheme={theme} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
