import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import 'chart.js/auto';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const formatNumber = (number) => {
  if (number >= 1_00_00_00_00_000) { // 1 Trillion
    return `${(number / 1_00_00_00_00_000).toFixed(2)} Tr`;
  } else if (number >= 1_00_00_00_00) { // 1 Billion
    return `${(number / 1_00_00_00_00).toFixed(2)} B`;
  } else if (number >= 1_00_00_00) { // 1 Crore
    return `${(number / 1_00_00_00).toFixed(2)} Cr`;
  } else if (number >= 1_00_000) { // 1 Lakh
    return `${(number / 1_00_000).toFixed(2)} L`;
  } else if (number >= 1000) { // 1 Thousand
    return `${(number / 1000).toFixed(2)} K`;
  }
  return number.toLocaleString(); // For smaller numbers
};


const App = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [monthlySales, setMonthlySales] = useState({});
  const [popularItems, setPopularItems] = useState({});
  const [topRevenueItems, setTopRevenueItems] = useState({});
  const [itemStats, setItemStats] = useState({});
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://chrio-4.onrender.com//api/total-sales'),
          fetch('https://chrio-4.onrender.com//api/monthly-sales'),
          fetch('https://chrio-4.onrender.com//api/popular-items'),
          fetch('https://chrio-4.onrender.com//api/top-revenue-items'),
          fetch('https://chrio-4.onrender.com//api/popular-item-stats'),
        ]);

        const [totalSalesRes, monthlySalesRes, popularItemsRes, topRevenueItemsRes, itemStatsRes] = await Promise.all(
          responses.map(res => res.json())
        );

        setTotalSales(totalSalesRes.totalSales);
        setMonthlySales(monthlySalesRes.monthlySales);
        setPopularItems(popularItemsRes);
        setTopRevenueItems(topRevenueItemsRes);
        setItemStats(itemStatsRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(monthlySales),
    datasets: [
      {
        label: 'Sales',
        data: Object.values(monthlySales).map(value => parseFloat(formatNumber(value).replace(/[^0-9.]/g, ''))),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        lineTension: 0.4, // Smooth the line
      },
    ],
  };
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Ice Cream Parlour Sales Dashboard</h1>

      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Sales</h3>
          <p className="text-2xl font-bold text-green-600">{formatNumber(totalSales)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Month-wise Sales</h3>
          <ul className="text-gray-600">
            {Object.entries(monthlySales).map(([month, sales]) => (
              <li key={month} className="mb-2">{month}: {formatNumber(sales)}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Most Popular Items</h3>
          <ul className="text-gray-600">
            {Object.entries(popularItems).map(([month, item]) => (
              <li key={month} className="mb-2">{month}: {item.SKU} - {formatNumber(item.Quantity)} units</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Top Revenue Items</h3>
          <ul className="text-gray-600">
            {Object.entries(topRevenueItems).map(([month, item]) => (
              <li key={month} className="mb-2">{month}: {item.SKU} - {formatNumber(item.Revenue)}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Statistics for Most Popular Items</h2>
        <ul className="text-gray-600">
          {Object.entries(itemStats).map(([month, stats]) => (
            <li key={month} className="mb-2">
              {month}: {stats.SKU} - Min: {formatNumber(stats.min)}, Max: {formatNumber(stats.max)}, Avg: {formatNumber(stats.avg)}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Chart</h2>
        <div className="w-full h-64">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default App;
