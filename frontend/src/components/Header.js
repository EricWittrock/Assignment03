import React, { useEffect, useState } from 'react';

function Header({stateCallback}) {

  const [email, setEmail] = useState(window.globalVars.account._email);

  function shopClick() {
    stateCallback(0);
  }

  function addClick() {
    stateCallback(1);
  }

  function updateClick() {
    stateCallback(2);
  }

  function deletClick() {
    stateCallback(3);
  }

  function aboutClick() {
    stateCallback(4);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container-fluid">

        <a className="navbar-brand" type="button" onClick={shopClick}>Get</a>
        <a className="navbar-brand" type="button" onClick={addClick}>Add</a>
        <a className="navbar-brand" type="button" onClick={updateClick}>Update</a>
        <a className="navbar-brand" type="button" onClick={deletClick}>Delete</a>
        <a className="navbar-brand" type="button" onClick={aboutClick}>About</a>

      </div>
    </nav>
  );
}

export default Header;