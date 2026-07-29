import React from 'react'

export default function loading() {
  return (
    <div>
    
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">

        <h1 className="text-4xl font-serif font-bold tracking-[0.3em] text-[#972020]">
          VELOURA
        </h1>

        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#972020] rounded-full animate-spin"></div>

        <p className="text-gray-500 text-lg">
          Loading...
        </p>

      </div>
    </div>
    </div>
  )
}
