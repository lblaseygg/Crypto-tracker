# Crypto Tracker

A modern, Apple-inspired cryptocurrency tracking application built with Next.js and Tailwind CSS. Track real-time cryptocurrency prices, market trends, and more with a beautiful, minimalist interface.

![Crypto Tracker Screenshot](public/screenshot.png)

## Features

- 🚀 Real-time cryptocurrency price tracking
- 📊 Interactive price charts with 7-day history
- 💰 Market cap and 24h price change data
- 📱 Responsive design for all devices
- 🎨 Apple-inspired minimalist UI
- ⚡ Fast and efficient data updates

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **API**: CoinGecko
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/lblaseygg/Crypto-tracker.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Crypto-tracker/
├── app/
│   ├── components/     # Reusable components
│   ├── styles/         # Global styles
│   ├── [coinId]/       # Dynamic coin pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── public/             # Static assets
├── tailwind.config.js  # Tailwind configuration
└── package.json        # Project dependencies
```

## Key Components

- `CryptoCard`: Displays individual cryptocurrency information
- `PriceChart`: Interactive price chart component
- `SearchBar`: Cryptocurrency search functionality
- `CryptoList`: Grid layout for cryptocurrency cards

## Styling

The application uses a custom Apple-inspired design system with:
- Clean, minimalist interface
- Glass morphism effects
- Smooth animations and transitions
- Responsive grid layouts
- Custom color palette

## API Integration

The application uses the CoinGecko API to fetch:
- Real-time cryptocurrency prices
- Market cap data
- 24-hour price changes
- 7-day price history for charts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing the cryptocurrency data API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework 