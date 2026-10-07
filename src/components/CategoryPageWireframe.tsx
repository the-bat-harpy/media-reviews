// src/components/CategoryPageWireframe.tsx
'use client';

import React from 'react';

export default function CategoryPageWireframe() {
  return (
    <div className="min-h-screen w-full bg-[#f8b4d9] bg-[url('/images/bg-manhwa.png')] bg-cover bg-center p-6 md:p-12 flex flex-col items-center justify-center font-sans">
      
      {/* 1. TOP NAV BAR */}
      <nav className="w-full max-w-5xl bg-[#d1d5db]/90 backdrop-blur-sm h-14 rounded-sm flex items-center justify-center gap-8 md:gap-16 text-black font-medium text-lg shadow-sm mb-10">
        <a href="/" className="hover:opacity-75 transition">home</a>
        <a href="/manhwa" className="hover:opacity-75 transition">manhwas</a>
        <a href="/books" className="hover:opacity-75 transition">books</a>
        <a href="/series" className="hover:opacity-75 transition">series</a>
        <a href="/movie" className="hover:opacity-75 transition">movies</a>
      </nav>

      {/* 2. MAIN FLOATING CONTAINER */}
      <div className="w-full max-w-5xl bg-[#d1d5db]/80 backdrop-blur-md rounded-[40px] p-8 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* LEFT SECTION: Cover, Rating, Add to Cart */}
        <div className="flex flex-col gap-4 items-center md:items-start w-full md:w-48 shrink-0">
          {/* Cover Box */}
          <div className="w-40 h-44 bg-white rounded-none flex items-center justify-center text-black font-normal text-lg shadow-sm p-2 text-center">
            cover ijage
          </div>

          {/* Rating Box */}
          <div className="w-40 bg-white h-10 flex items-center justify-center text-black font-normal text-lg shadow-sm">
            rating
          </div>

          {/* Add to Cart Button */}
          <button className="w-40 bg-white hover:bg-gray-50 h-10 flex items-center justify-center text-black font-normal text-base shadow-sm transition">
            add to card
          </button>
        </div>

        {/* CENTER SECTION: Name, Tags, Review */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Name Box */}
          <div className="w-full max-w-md bg-white h-10 flex items-center justify-start px-6 text-black font-normal text-lg shadow-sm">
            name
          </div>

          {/* Tags Box */}
          <div className="w-full max-w-md bg-white h-10 flex items-center justify-start px-6 text-black font-normal text-lg shadow-sm">
            tags
          </div>

          {/* Review Text Box */}
          <div className="w-full bg-white p-6 min-h-[160px] text-black font-normal text-lg leading-snug shadow-sm flex items-start">
            review (doesnt need to be complete, just like the first lines)
          </div>
        </div>

        {/* RIGHT SECTION: Tag Filter Buttons Sidebar */}
        <div className="w-full md:w-44 bg-white p-4 rounded-xl shadow-sm flex flex-col justify-between min-h-[260px] shrink-0">
          {/* Tag to Include Button */}
          <button className="w-full bg-[#d68585] hover:bg-[#cc7878] text-white font-normal py-5 px-3 rounded-2xl text-center text-base shadow-sm transition">
            tag to include
          </button>

          {/* Tag to Exclude Button */}
          <button className="w-full bg-[#cb2c2c] hover:bg-[#b82323] text-white font-normal py-5 px-3 rounded-2xl text-center text-base shadow-sm transition">
            tag to exclude
          </button>
        </div>

      </div>
    </div>
  );
}