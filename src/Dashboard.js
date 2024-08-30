import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const salesData = `
    2019-01-01,Death by Chocolate,180,5,900
    2019-01-01,Cake Fudge,150,1,150
    2019-01-01,Cake Fudge,150,1,150
    2019-01-01,Cake Fudge,150,3,450
    2019-01-01,Death by Chocolate,180,1,180
    2019-01-01,Vanilla Double Scoop,80,3,240
    2019-01-01,Butterscotch Single Scoop,60,5,300
    2019-01-01,Vanilla Single Scoop,50,5,250
    2019-01-01,Cake Fudge,150,5,750
    2019-01-01,Hot Chocolate Fudge,120,3,360
    2019-01-01,Butterscotch Single Scoop,60,5,300
    2019-01-01,Chocolate Europa Double Scoop,100,1,100
    2019-01-01,Hot Chocolate Fudge,120,2,240
    2019-01-01,Caramel Crunch Single Scoop,70,4,280
    2019-01-01,Hot Chocolate Fudge,120,2,240
    2019-01-01,Hot Chocolate Fudge,120,4,480
    2019-01-01,Hot Chocolate Fudge,120,2,240
    2019-01-01,Cafe Caramel,160,5,800
    2019-01-01,Vanilla Double Scoop,80,4,320
    2019-01-01,Butterscotch Single Scoop,60,3,180
    2019-01-01,Butterscotch Single Scoop,60,3,180
    2019-01-01,Vanilla Single Scoop,50,2,100
    2019-01-01,Butterscotch Single Scoop,60,3,180
    2019-01-01,Vanilla Double Scoop,80,1,80
    2019-01-01,Death by Chocolate,180,2,360
    2019-01-01,Cafe Caramel,160,2,320
    2019-01-01,Pista Single Scoop,60,3,180
    2019-01-01,Hot Chocolate Fudge,120,2,240
    2019-01-01,Vanilla Single Scoop,50,3,150
    2019-01-01,Vanilla Single Scoop,50,5,250
    2019-01-01,Cake Fudge,150,1,150
    2019-01-01,Vanilla Single Scoop,50,4,200
    2019-01-01,Vanilla Double Scoop,80,3,240
    2019-01-01,Cake Fudge,150,1,150
    2019-01-01,Vanilla Double Scoop,80,5,400
    2019-01-01,Hot Chocolate Fudge,120,5,600
    2019-01-01,Vanilla Double Scoop,80,2,160
    2019-01-01,Vanilla Double Scoop,80,3,240
    2019-01-01,Hot Chocolate Fudge,120,5,600
    2019-01-01,Cake Fudge,150,5,750
    2019-01-01,Vanilla Single Scoop,50,5,250
    2019-01-01,Cake Fudge,150,5,750
    2019-01-01,Pista Single Scoop,60,1,60
    2019-01-01,Butterscotch Single Scoop,60,2,120
    2019-01-01,Vanilla Double Scoop,80,1,80
    2019-01-01,Cafe Caramel,160,1,160
    2019-01-01,Cake Fudge,150,5,750
    2019-01-01,Trilogy,160,5,800
    2019-01-01,Butterscotch Single Scoop,60,3,180
    2019-01-01,Death by Chocolate,180,2,360
    2019-01-01,Butterscotch Single Scoop,60,1,60
    2019-01-01,Hot Chocolate Fudge,120,3,360
    2019-01-01,Cake Fudge,150,2,300
    2019-01-01,Cake Fudge,150,2,300
    2019-01-01,Vanilla Single Scoop,50,4,200
    2019-01-01,Cafe Caramel,160,1,160
    2019-01-01,Cake Fudge,150,5,750
    2019-01-01,Cafe Caramel,160,5,800
    2019-01-01,Almond Fudge,150,1,150
    2019-01-01,Cake Fudge,150,1,150
    2019-01-01,Death by Chocolate,180,5,900
    2019-01-01,Death by Chocolate,180,5,900
    2019-01-01,Hot Chocolate Fudge,120,4,480
    2019-01-01,Cake Fudge,150,2,300
    2019-01-01,Cake Fudge,150,4,600
    2019-01-01,Butterscotch Single Scoop,60,5,300
    2019-01-01,Vanilla Double Scoop,80,4,320
    2019-01-01,Death by Chocolate,180,2,360
    2019-01-01,Caramel Crunch Double Scoop,100,5,500
    2019-01-01,Vanilla Single Scoop,50,3,150
    2019-01-01,Hot Chocolate Fudge,120,1,120
    2019-01-01,Vanilla Double Scoop,80,3,240
    2019-01-01,Cafe Caramel,160,1,160
    2019-01-01,Vanilla Double Scoop,80,4,320
    2019-01-01,Death by Chocolate,180,3,540
    2019-01-01,Vanilla Double Scoop,80,5,400
    2019-01-01,Vanilla Single Scoop,50,1,50
    2019-01-01,Cafe Caramel,160,3,480
    2019-01-01,Vanilla Double Scoop,80,4,320
    2019-01-01,Death by Chocolate,180,2,360
    2019-01-01,Hot Chocolate Fudge,120,5,600
    2019-01-01,Pista Single Scoop,60,2,120
    2019-01-01,Cake Fudge,150,2,300
    2019-01-01,Hot Chocolate Fudge,120,2,240
    2019-01-01,Vanilla Single Scoop,50,5,250
    2019-01-01,Dry Fruit Double Scoop,90,3,270
    2019-01-01,Butterscotch Single Scoop,60,3,180
    2019-01-01,Cake Fudge,150,2,300
    2019-01-01,Vanilla Double Scoop,80,5,400
    2019-01-01,Dry Fruit Single Scoop,60,1,60
    2019-01-01,Cafe Caramel,160,5,800
    2019-01-01,Hot Chocolate Fudge,120,4,480
    2019-01-01,Chocolate Europa Double Scoop,100,4,400
    2019-01-01,Rocky Road Single Scoop,50,1,50
    2019-01-01,Hot Chocolate Fudge,120,4,480
    2019-01-01,Hot Chocolate Fudge,120,3,360
    2019-01-01,Vanilla Double Scoop,80,3,240
    2019-01-01,Cafe Caramel,160,2,320
    2019-01-01,Vanilla Double Scoop,80,1,80
    2019-01-01,Vanilla Double Scoop,80,5,400
    2019-01-01,Cake Fudge,150,3,450
    2019-01-01,Vanilla Single Scoop,50,5,250
    2019-01-01,Hot Chocolate Fudge,120,2,240
    2019-01-01,Hot Chocolate Fudge,120,5,600
    2019-01-01,Vanilla Double Scoop,80,2,160
    2019-01-01,Vanilla Single Scoop,50,4,200
    2019-01-01,Vanilla Double Scoop,80,5,400
    2019-01-01,Vanilla Single Scoop,50,4,200
    2019-01-01,Vanilla Single Scoop,50,4,200
    2019-01-01,Mint Fudge,120,3,360
    `;
    
    const parseData = (data) => {
      const rows = data.trim().split('\n');
      const headers = ['Date', 'SKU', 'Unit Price', 'Quantity', 'Total Price'];
    
      return rows.map(row => {
        const values = row.split(',');
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index];
        });
        return obj;
      });
    };
    
    const salesArray = parseData(salesData);
   
    

//   useEffect(() => {
//     // Fetch data from the backend
//     axios.get('/api/sales-data').then((response) => {
//       setSalesData(response.data);
//     });
//   }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Ice Cream Sales Dashboard</h1>
      
      {salesArray ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salesArray.map((data) => (
            <div key={data} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{data.Date}</h2>
              <p className="mb-2">Total Sales: ${}</p>
              {/* <p className="mb-2">Most Popular Item: {data.popularItem.item}</p>
              <p className="mb-2">Min Orders: {data.minQuantity}</p>
              <p className="mb-2">Max Orders: {data.maxQuantity}</p>
              <p className="mb-2">Average Orders: {data.avgQuantity}</p> */}
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
