import CryptoList from './components/CryptoList'

async function getCryptoData() {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true', {
    next: { revalidate: 60 } // Revalidate every minute
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

export default async function Home() {
  const cryptoData = await getCryptoData()

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-gradient tracking-tight transition-all duration-300 hover:scale-105">
              Crypto Tracker
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-apple-blue to-blue-600 mx-auto rounded-full transition-all duration-300 hover:w-32"></div>
          </div>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-slide-in">
            Track the top cryptocurrencies with real-time data and beautiful visualizations
          </p>
          <div className="flex justify-center space-x-4 pt-4 animate-fade-in">
            <span className="text-sm text-gray-400 transition-colors duration-300 hover:text-apple-blue">Updated every minute</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400 transition-colors duration-300 hover:text-apple-blue">Powered by CoinGecko</span>
          </div>
        </div>

        <CryptoList initialData={cryptoData} />
      </div>
    </main>
  )
}
