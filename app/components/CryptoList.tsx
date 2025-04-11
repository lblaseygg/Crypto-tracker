'use client'

import { useState } from 'react'
import CryptoCard from './CryptoCard'
import SearchBar from './SearchBar'

interface CryptoListProps {
  initialData: any[]
}

export default function CryptoList({ initialData }: CryptoListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = initialData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="mt-12">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            name={crypto.name}
            symbol={crypto.symbol}
            currentPrice={crypto.current_price}
            priceChange24h={crypto.price_change_percentage_24h}
            marketCap={crypto.market_cap}
            image={crypto.image}
            sparkline={crypto.sparkline_in_7d.price}
          />
        ))}
      </div>
    </>
  )
} 