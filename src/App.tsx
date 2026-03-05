/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserApp } from './components/UserApp';
import { AuthScreen } from './components/AuthScreen';

export default function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('subtrack_token'));
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('subtrack_theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = (newToken: string, user: any) => {
    localStorage.setItem('subtrack_token', newToken);
    setToken(newToken);
  };

  return (
    <div className="h-screen w-full font-sans overflow-hidden relative">
      {token ? (
        <UserApp />
      ) : (
        <AuthScreen onLogin={handleLogin} theme={theme} />
      )}
    </div>
  );
}

