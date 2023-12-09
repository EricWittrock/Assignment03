function Update() {
  function updateItem() {
    const name = document.getElementById('prodName').value;
    const price = document.getElementById('prodPrice').value;
    const description = document.getElementById('prodDesc').value;
    const category = document.getElementById('prodCategory').value;
    const imgUrl = document.getElementById('imgUrl').value;
    const id = document.getElementById('prodID').value;
    const ratingNum = document.getElementById('prodRating').value;
    const ratingCount = document.getElementById('ratingCount').value;
    updateTheItem(name, price, description, category, imgUrl, id, ratingNum, ratingCount);
  }

  function updateTheItem(name, price, description, category, imgUrl, id, ratingNum, ratingCount) {
    // Validation
    if (!name || !price || !description || !category || !imgUrl || !id || !ratingNum || !ratingCount) {
        window.alert("Empty field");
        return;
    }

    fetch('http://localhost:8000/updateItem', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, price, description, category, imgUrl, ratingNum, ratingCount }),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            window.alert("Item updated");
        } else if (data.error) {
            window.alert("Unable to update item. " + data.error);
        } else {
            window.alert("Unknown error occurred");
        }
    })
    .catch(err => {
        console.log('Error updating item:');
        console.log(err);
        window.alert("Unable to update item");
    });
}

  return (
    <div id="update">
      <h1>Update</h1>
      <div className="input-group mb-3" style={{ marginTop: "50px" }}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Name
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Product name"
          id="prodName"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        />
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
          style={{ marginRight: "14px" }}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Description
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Product description"
          id="prodDesc"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        />
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Category
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Product category"
          id="prodCategory"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Image URL
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Image Link"
          id="imgUrl"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        />
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Product ID#
          </span>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="ID Number"
          id="prodID"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Rating
          </span>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="Rating"
          id="prodRating"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        />
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Rating Count
          </span>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="Number of Ratings"
          id="ratingCount"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        />
      </div>
      <div className="button-thing" style={{ padding: "5px", marginLeft: "45%", display: "block" }}>
        <button type="button" onClick={updateItem} className="btn btn-secondary">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Update;