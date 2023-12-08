function Add() {
  function addItem({ name, price, description, category }) {}

  return (
    <div id="add">
      <h1>Add</h1>
      <div class="input-group mb-3" style={{ marginTop: "50px" }}>
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            Name
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Product name"
          aria-label="prodName"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        ></input>
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            Price
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Product price"
          aria-label="prodPrice"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        ></input>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            Description
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Product description"
          aria-label="prodDesc"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        ></input>
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            Category
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Product category"
          aria-label="prodCategory"
          aria-describedby="basic-addon1"
          style={{ marginRight: "14px" }}
        ></input>
      </div>
      <div class="button-thing" style={{padding:"5px", marginLeft:"45%", display:"block"}}>
        <button type="button" class="btn btn-secondary">Submit</button>
      </div>
    </div>
  );
}

export default Add;