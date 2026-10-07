// src/components/MediaDetailWireframe.tsx
'use client';

import React from 'react';

export default function MediaDetailWireframe() {
  return (
    <div className="min-h-screen w-full bg-[#2a68c2] bg-[url('/images/bg-blue-pixel.png')] bg-cover bg-center p-6 md:p-12 flex flex-col items-center justify-center font-sans">
      
      {/* 1. TOP NAV BAR */}
      <nav className="w-full max-w-6xl bg-[#e5e7eb]/90 backdrop-blur-sm h-12 rounded-sm flex items-center justify-center gap-8 md:gap-16 text-black font-medium text-lg shadow-sm mb-8">
        <a href="/" className="hover:opacity-75 transition">home</a>
        <a href="/manhwa" className="hover:opacity-75 transition">manhwas</a>
        <a href="/books" className="hover:opacity-75 transition">books</a>
        <a href="/series" className="hover:opacity-75 transition">series</a>
        <a href="/movie" className="hover:opacity-75 transition">movies</a>
      </nav>

      {/* 2. MAIN FLOATING CONTAINER */}
      <div className="w-full max-w-6xl bg-[#d1d5db]/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl relative">
        
        {/* TOP RIGHT ABSOLUTE / FLEX BUTTONS: Rating & Add to Cart */}
        <div className="flex items-center gap-6 justify-end mb-6">
          <div className="bg-white px-8 h-12 flex items-center justify-center text-black font-normal text-lg shadow-sm">
            rating
          </div>
          <button className="bg-white hover:bg-gray-50 px-8 h-12 flex items-center justify-center text-black font-normal text-lg shadow-sm transition">
            add to card
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* FAR LEFT COLUMN: Cover, Status, Tags, Year */}
          <div className="md:col-span-3 flex flex-col gap-4">
            {/* Cover */}
            <div className="w-full h-44 bg-white flex items-center justify-center text-black font-normal text-lg shadow-sm">
              cover
            </div>

            {/* Status */}
            <div className="w-full bg-white h-12 flex items-center justify-center text-black font-normal text-lg shadow-sm">
              status
            </div>

            {/* Tags */}
            <div className="w-full bg-white h-20 flex items-center justify-center text-black font-normal text-lg shadow-sm">
              tags
            </div>

            {/* Year */}
            <div className="w-full bg-white h-12 flex items-center justify-center text-black font-normal text-lg shadow-sm">
              year
            </div>
          </div>

          {/* CENTER SECTION: Title, Creator, Review, Similar Recs */}
          <div className="md:col-span-9 flex flex-col gap-4">
            {/* Title */}
            <div className="w-full max-w-xl bg-white h-12 flex items-center justify-start px-6 text-black font-normal text-lg shadow-sm">
              title
            </div>

            {/* Creator */}
            <div className="w-36 bg-white h-8 flex items-center justify-start px-4 text-black font-normal text-base shadow-sm">
              creator
            </div>

            {/* Review Box */}
            <div className="w-full bg-white p-6 min-h-[180px] text-black font-normal text-lg leading-snug shadow-sm">
              review
            </div>

            {/* Similar Recs Box */}
            <div className="w-full bg-white p-4 min-h-[120px] text-black font-normal shadow-sm flex flex-col justify-start">
              <span className="text-lg text-black mb-2">similar recs</span>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#e5e7eb] flex items-center justify-center text-xs text-black border border-gray-300">
                  cover
                </div>
                <span className="text-lg text-black">name</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}