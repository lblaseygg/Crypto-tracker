'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-in">
      <div className="relative">
        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-300 ${isFocused ? 'scale-110' : 'scale-100'}`}>
          <MagnifyingGlassIcon className={`h-5 w-5 transition-colors duration-300 ${isFocused ? 'text-apple-blue' : 'text-gray-400'}`} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="search-input"
          placeholder="Search cryptocurrencies..."
        />
      </div>
    </div>
  )
} 