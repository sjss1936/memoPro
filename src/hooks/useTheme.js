import { useState, useEffect } from 'react';

const THEME_STORAGE_KEY = 'app-theme';

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    // 로컬 스토리지에서 초기 테마를 읽어옵니다.
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    // 시스템 설정에 따라 기본 테마를 결정합니다.
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    // 테마가 변경될 때마다 body에 클래스를 추가/제거하고 로컬 스토리지에 저장합니다.
    document.body.className = ''; // 기존 클래스 초기화
    document.body.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
