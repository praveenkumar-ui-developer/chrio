const express = require('express');
const cors = require('cors');
const dataObjects = require('./data');

const app = express();
app.use(cors());

// Helper function to calculate month from date
const getMonth = (dateString) => new Date(dateString).toLocaleString('default', { month: 'long', year: 'numeric' });

// Route to get total sales
app.get('/api/total-sales', (req, res) => {
    const totalSales = dataObjects.reduce((sum, item) => sum + item['Total Price'], 0);
    res.json({ totalSales });
});

// Route to get month-wise sales totals
app.get('/api/monthly-sales', (req, res) => {
    const monthlySales = {};

    dataObjects.forEach(item => {
        const month = getMonth(item.Date);
        monthlySales[month] = (monthlySales[month] || 0) + item['Total Price'];
    });

    res.json({ monthlySales });
});

// Route to get the most popular item per month
app.get('/api/popular-items', (req, res) => {
    const popularItems = {};

    dataObjects.forEach(item => {
        const month = getMonth(item.Date);
        if (!popularItems[month]) {
            popularItems[month] = {};
        }
        popularItems[month][item.SKU] = (popularItems[month][item.SKU] || 0) + item.Quantity;
    });

    const result = {};
    for (const month in popularItems) {
        const maxItem = Object.entries(popularItems[month]).reduce((a, b) => b[1] > a[1] ? b : a);
        result[month] = { SKU: maxItem[0], Quantity: maxItem[1] };
    }

    res.json(result);
});

// Route to get items generating most revenue in each month
app.get('/api/top-revenue-items', (req, res) => {
    const revenueItems = {};

    dataObjects.forEach(item => {
        const month = getMonth(item.Date);
        if (!revenueItems[month]) {
            revenueItems[month] = {};
        }
        revenueItems[month][item.SKU] = (revenueItems[month][item.SKU] || 0) + item['Total Price'];
    });

    const result = {};
    for (const month in revenueItems) {
        const maxRevenueItem = Object.entries(revenueItems[month]).reduce((a, b) => b[1] > a[1] ? b : a);
        result[month] = { SKU: maxRevenueItem[0], Revenue: maxRevenueItem[1] };
    }

    res.json(result);
});

// Route to get min, max, and average orders for the most popular item each month
app.get('/api/popular-item-stats', (req, res) => {
    const itemStats = {};

    dataObjects.forEach(item => {
        const month = getMonth(item.Date);
        if (!itemStats[month]) {
            itemStats[month] = {};
        }
        itemStats[month][item.SKU] = itemStats[month][item.SKU] || [];
        itemStats[month][item.SKU].push(item.Quantity);
    });

    const result = {};
    for (const month in itemStats) {
        for (const sku in itemStats[month]) {
            const quantities = itemStats[month][sku];
            const min = Math.min(...quantities);
            const max = Math.max(...quantities);
            const avg = quantities.reduce((a, b) => a + b, 0) / quantities.length;
            result[month] = { SKU: sku, min, max, avg };
        }
    }

    res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
