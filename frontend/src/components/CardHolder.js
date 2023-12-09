import React, { useEffect, useState } from 'react';
import Card from './Card';

function CardHolder() {
  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/shopdata')
      .then(res => res.json())
      .then(data => {
        setShopData(data);
      })
      .catch(err => {
        console.log('Error loading shop data:');
        console.log(err);
      });
  }, []);

  if (shopData.length === 0) {
    return <h2 className='text-dark'>Loading... You may not have anything in your database</h2>;
  }

  return (
    <>
      {
        shopData.map((f, index) => (
          <Card key={f.id} data={f}/>
        ))
      }
    </>
  );
}

export default CardHolder;