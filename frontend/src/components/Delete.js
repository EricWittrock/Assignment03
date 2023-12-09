import React, { useState } from 'react';

function Delete() {
  const [shopData, setShopData] = useState([]);

  useState(() => {
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

  function deleteClick() {
    let id = document.getElementById("inputGroupSelectDelete").value;
    if(id == -1) {
      window.alert("please select an id");
      return;
    }
    fetch('http://localhost:8000/deleteItem', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id}),
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.success) {
        window.alert("item deleted");
      }else{
        window.alert("unable to delete item. " + data.error);
      }
    })
    .catch(err => {
      console.log('Error deleting shop data:');
      console.log(err);
      window.alert("unable to delete item")
    });
  }

  return (
    <div style={{width:"100%"}}>
      <h1>Delete</h1>
      <div className="input-group justify-content-center" style={{padding:"10px"}}>
        <select className="custom-select" id="inputGroupSelectDelete" style={{width:"300px"}}>
          <option value={-1}>Choose ID...</option>
          {
            shopData.map((f, index) => (
              <option key={f.id+"_selectDelItem"} value={f.id}>{f.id}</option>
            ))
          }
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={deleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
