'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  market_cap: number;
  total_volume: number;
  image: string;
}

interface ChartData {
  prices: [number, number][];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(isNaN(value) ? 0 : value);
};

export default function CoinPage() {
  const params = useParams();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [coinResponse, chartResponse] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${params.coinId}`),
          fetch(`https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=usd&days=30`)
        ]);

        if (!coinResponse.ok || !chartResponse.ok) {
          throw new Error('Failed to fetch coin data');
        }

        const coinData = await coinResponse.json();
        const chartData = await chartResponse.json();

        setCoinData({
          id: coinData.id,
          name: coinData.name,
          symbol: coinData.symbol.toUpperCase(),
          current_price: coinData.market_data?.current_price?.usd ?? 0,
          price_change_percentage_24h: coinData.market_data?.price_change_percentage_24h ?? null,
          market_cap: coinData.market_data?.market_cap?.usd ?? 0,
          total_volume: coinData.market_data?.total_volume?.usd ?? 0,
          image: coinData.image?.large ?? ''
        });

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('Failed to load coin data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (params.coinId) {
      fetchCoinData();
    }
  }, [params.coinId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apple-accent"></div>
      </div>
    );
  }

  if (error || !coinData || !chartData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{error || 'Failed to load coin data'}</p>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const data = {
    labels: chartData.prices.map((price) => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        data: chartData.prices.map((price) => price[1]),
        borderColor: '#1D1D1F',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(29, 29, 31, 0.1)',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-4 mb-8">
          <img src={coinData.image} alt={coinData.name} className="w-12 h-12" />
          <div>
            <h1 className="text-4xl font-bold">{coinData.name}</h1>
            <p className="text-gray-500">{coinData.symbol}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Price Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Current Price</span>
                <span className="font-semibold">{formatCurrency(coinData.current_price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">24h Change</span>
                <span className={(coinData.price_change_percentage_24h ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {(coinData.price_change_percentage_24h ?? 0).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Market Cap</span>
                <span className="font-semibold">{formatCurrency(coinData.market_cap)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">24h Volume</span>
                <span className="font-semibold">{formatCurrency(coinData.total_volume)}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">30-Day Price Chart</h2>
            <div className="h-64">
              <Line data={data} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}