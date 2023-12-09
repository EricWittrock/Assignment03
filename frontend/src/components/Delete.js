import React, { useState } from 'react';
import Card from './Card';

function Delete() {
  const [shopData, setShopData] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [selectedData, setSelectedData] = useState(undefined);

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
    if(selectedId == -1) {
      window.alert("please select an id");
      return;
    }
    fetch('http://localhost:8000/deleteItem', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: selectedId}),
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

  function selectChange() {
    let id = document.getElementById("inputGroupSelectDelete").value;
    let sd = shopData.find(i=>i.id==id);
    setSelectedId(id);
    setSelectedData(sd);
    console.log(shopData);
    console.log(sd);
    console.log(selectedData);
    console.log("selected id: " + id);
  }

  return (
    <div style={{width:"100%"}}>
      <h1>Delete</h1>
      <div className="input-group justify-content-center">
        <select className="custom-select" id="inputGroupSelectDelete" style={{width:"300px"}} onChange={selectChange}>
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
      <div style={{height:"50px"}}></div>
      {
        selectedData && <Card key={selectedId+"_deleteCard"} data={selectedData}/>
      }
    </div>
  );
}

export default Delete;
