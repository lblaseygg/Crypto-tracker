'use client';

import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import PriceChart from './PriceChart'

interface CryptoCardProps {
  name: string
  symbol: string
  currentPrice: number
  priceChange24h: number
  marketCap: number
  image: string
  sparkline?: number[]
}

export default function CryptoCard({
  name,
  symbol,
  currentPrice,
  priceChange24h,
  marketCap,
  image,
  sparkline = [],
}: CryptoCardProps) {
  const isPositive = priceChange24h >= 0
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currentPrice)

  const formattedMarketCap = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(marketCap)

  // Generate labels for the chart
  const labels = Array.from({ length: sparkline.length }, (_, i) => i.toString())

  return (
    <div className="card glass-effect animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-white/50 p-2 flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <img src={image} alt={name} className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-apple-dark transition-colors duration-300 hover:text-apple-blue">
              {name}
            </h3>
            <p className="text-gray-500 text-sm">{symbol.toUpperCase()}</p>
          </div>
        </div>
        <div className={`flex items-center ${isPositive ? 'price-change-positive' : 'price-change-negative'}`}>
          {isPositive ? (
            <ArrowUpIcon className="w-5 h-5" />
          ) : (
            <ArrowDownIcon className="w-5 h-5" />
          )}
          <span className="ml-1 font-medium">{Math.abs(priceChange24h).toFixed(2)}%</span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-2xl font-bold text-gradient transition-all duration-300 hover:scale-105">
          {formattedPrice}
        </p>
        {sparkline.length > 0 && (
          <div className="mt-4 chart-container">
            <PriceChart
              prices={sparkline}
              labels={labels}
              color={isPositive ? '#34D399' : '#EF4444'}
            />
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Market Cap</p>
          <p className="text-lg font-medium text-apple-dark transition-colors duration-300 hover:text-apple-blue">
            {formattedMarketCap}
          </p>
        </div>
      </div>
    </div>
  )
}