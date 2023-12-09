import React, { useState } from "react";
import Card from "./Card";
function Update() {
  const [shopData, setShopData] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [selectedData, setSelectedData] = useState(undefined);

  useState(() => {
    fetch("http://localhost:8000/shopdata")
      .then((res) => res.json())
      .then((data) => {
        setShopData(data);
      })
      .catch((err) => {
        console.log("Error loading shop data:");
        console.log(err);
      });
  }, []);

  function updateItem() {
    // const name = document.getElementById('prodName').value;
    const price = document.getElementById("prodPrice").value;
    // const description = document.getElementById('prodDesc').value;
    // const category = document.getElementById('prodCategory').value;
    // const imgUrl = document.getElementById('imgUrl').value;
    const id = document.getElementById("prodID").value;
    // const ratingNum = document.getElementById('prodRating').value;
    // const ratingCount = document.getElementById('ratingCount').value;
    console.log("price: " + price)
    console.log("id: " + id)
    updateTheItem(price, id);
  }

  function updateTheItem(price, id) {
    // Validation
    // ...

    if (!price) {
      window.alert("New price field is empty");
      return;
    }

    fetch("http://localhost:8000/updatePrice", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          window.alert("Price updated");
        } else if (data.error) {
          window.alert("Unable to update price. " + data.error);
        } else {
          window.alert("Unknown error occurred");
        }
      })
      .catch((err) => {
        console.log("Error updating price:");
        console.log(err);
        window.alert("Unable to update price");
      });
  }

  function selectChange() {
    let id = document.getElementById("inputGroupSelectUpdate").value;
    let sd = shopData.find((i) => i.id == id);
    let selectedIndex = shopData.findIndex((i) => i.id == id);
  
    setSelectedId(selectedIndex);
    setSelectedData(sd);
  
    console.log(shopData);
    console.log(sd);
    console.log(selectedData);
    console.log("selected id: " + id);
  }
  return (
    <div style={{ width: "100%" }}>
      <h1>Update</h1>
      <div className="input-group justify-content-center">
        <select
          className="custom-select"
          id="inputGroupSelectUpdate"
          style={{ width: "300px" }}
          onChange={selectChange}
        >
          <option value={-1}>Choose ID...</option>
          {shopData.map((f, index) => (
            <option key={f.id + "_selectUpdateItem"} value={f.id}>
              {f.id}
            </option>
          ))}
        </select>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Price
          </span>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="Product price"
          id="prodPrice"
          aria-describedby="basic-addon1"
          style={{ marginLeft: "14px" }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={updateItem}
          >
            Update
          </button>
        </div>
      </div>
      <div style={{ height: "50px" }}></div>
      {shopData[selectedId] && (
        <Card key={selectedId + "_updateCard"} data={shopData[selectedId]} />
      )}
    </div>
  );
}

export default Update;
