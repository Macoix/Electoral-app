import { useEffect, useState } from "react";

export default function useDarkMode () {

  const [isDarkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark' ? true : false)
  const isDark = isDarkMode === true ? 'dark' : 'light'

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(isDarkMode === true ? 'light' : 'dark');
    root.classList.add(isDarkMode === true ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode === true ? 'dark' : 'light');
  }, [isDark, setDarkMode])

  return {
    isDark,
    toggleDarkMode: () => setDarkMode(prev => !prev)
  }
}
