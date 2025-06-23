import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Layout() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2a354d] text-white p-4 flex flex-col items-center">
        <div className="mb-6 w-[90px]">
          <img src={logo} alt="logo" className="w-full" />
        </div>

        <nav className="flex flex-col gap-2 w-full">
          {['products', 'category', 'discount', 'sizes', 'colors', 'faq', 'contact', 'team', 'news'].map((route) => (
            <NavLink
              key={route}
              to={`/${route}`}
              className="hover:bg-gray-700 px-4 py-2 rounded text-center"
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="p-4 bg-white text-right shadow">
          <button
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-300 hover:text-black"
            onClick={logOut}
          >
            Log Out
          </button>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
