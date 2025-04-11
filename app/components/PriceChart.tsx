'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface PriceChartProps {
  prices: number[]
  labels: string[]
  color: string
}

export default function PriceChart({ prices, labels, color }: PriceChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1D1D1F',
        bodyColor: '#1D1D1F',
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            return `$${context.parsed.y.toFixed(2)}`
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="h-20 w-full">
      <Line data={data} options={options} />
    </div>
  )
} 