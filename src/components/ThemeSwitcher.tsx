'use client';

import { useEffect, useState } from 'react';
import { FaPalette } from 'react-icons/fa';

const themes = [
  'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 
  'retro', 'cyberpunk', 'valentine', 'halloween', 'garden',
  'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe',
  'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business',
  'acid', 'lemonade', 'night', 'coffee', 'winter', 'light', 'dark'
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('cupcake');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'cupcake';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setIsOpen(false);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => setIsOpen(!isOpen)}>
        <FaPalette className="h-5 w-5" />
      </label>
      {isOpen && (
        <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 max-h-96 overflow-y-auto">
          {themes.map((theme) => (
            <li key={theme}>
              <button
                className={`btn btn-sm btn-block btn-ghost justify-start ${currentTheme === theme ? 'btn-active' : ''}`}
                onClick={() => changeTheme(theme)}
                data-theme={theme}
              >
                <span className="flex items-center gap-2 w-full">
                  <span className="flex-1 text-left capitalize">{theme}</span>
                  {currentTheme === theme && <span className="text-primary">✓</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
