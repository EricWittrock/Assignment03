import React, { useEffect, useState } from 'react';
import Card from './Card';

function CardHolder() {
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/shopdata')
      .then(res => res.json())
      .then(data => {
        const d = data.fireworkData.filter(i => i.type === 'firework');
        window.globalVars.shopData = d;
        setFireworks(d);
      })
      .catch(err => {
        console.log('Error loading shop data:');
        console.log(err);
      });
  }, []);

  if (fireworks.length === 0) {
    return <h1 className='text-light'>Loading...</h1>;
  }

  return (
    <>
      {
        fireworks.map((f, index) => (
          <Card key={f.productid} data={f}/>
        ))
      }
    </>
  );
}

export default CardHolder;